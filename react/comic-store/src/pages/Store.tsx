import ItemCards from "../components/ItemCards.tsx";
import Comic from "../interfaces/Comic.tsx";
import { useMemo, useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Loading from "../components/Loading.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { ComicOrderBy, ComicFormat } from "../interfaces/types.tsx";

function Filters({
  itemLimitArray,
  itemLimit,
  setItemLimit,
  format,
  setFormat,
  formats,
  searchTitle,
  setSearchTitle,
  orderBy,
  setOrderBy,
  orderByArray,
  startYear,
  setStartYear,
}: {
  itemLimitArray: number[];
  itemLimit: number;
  setItemLimit: (newNumber: number) => void;
  format: ComicFormat;
  setFormat: (format: ComicFormat) => void;
  formats: ComicFormat[];
  searchTitle: string;
  setSearchTitle: (search: string) => void;
  orderBy: ComicOrderBy;
  setOrderBy: (orderBy: ComicOrderBy) => void;
  orderByArray: ComicOrderBy[];
  startYear: string;
  setStartYear: (year: string) => void;
}) {
  const [searchValue, setSearchValue] = useState<string>(searchTitle);

  const updateItemLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemLimit(Number(e.target.value as string));
  };
  const updateFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value as ComicFormat);
  };
  const updateOrderBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as ComicOrderBy);
  };
  const updateStartYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartYear(e.target.value as string);
  };

  const handleSearchButton = () => {
    const searchTerm: string = searchValue.toLowerCase() || "";
    console.log(searchTerm);
    setSearchTitle(searchTerm);
  };
  return (
    <div className=" flex max-h-screen">
      <div className="p-5 flex flex-1 gap-4 items-start justify-start flex-col">
        <h3>Filters</h3>
        <div className="flex bg-slate-100 items-center  h-10 ">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search by title word "
            className=" w-min min-w-40 bg-transparent h-full p-2"
          />{" "}
          <button
            onClick={() => handleSearchButton()}
            className=" opacity-50 px-4 bg-slate-300 h-full hover:opacity-30"
          >
            <FaSearch />
          </button>
        </div>
        <div className="bg-slate-100 pl-2 w-full flex justify-between items-center">
          <span className="mr-2 h-full flex items-center">Starting Year </span>
          <select
            value={startYear}
            onChange={(e) => updateStartYear(e)}
            className="bg-slate-200 p-2"
          >
            <option value="unset">Unset</option>
            {Array.from({ length: 2024 - 1938 + 1 }, (_, i) =>
              (2024 - i).toString()
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-100 pl-2 flex w-full justify-between items-center">
          <span className="mr-2 flex items-center">Items per page</span>
          <select
            onChange={updateItemLimit}
            value={itemLimit}
            className="bg-slate-200 p-2 "
          >
            {itemLimitArray.map((number, index) => (
              <option key={index} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-slate-100 pl-2  w-full flex justify-between items-center">
          <span className="mr-2 flex items-center">Order by</span>
          <select
            onChange={updateOrderBy}
            value={orderBy}
            className="bg-slate-200 p-2 "
          >
            {orderByArray.map((order, index) => (
              <option key={index} value={order}>
                {order}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-slate-100 pl-2  w-full flex justify-between items-center">
          <span className="mr-2 flex items-center">Format</span>
          <select
            onChange={updateFormat}
            value={format}
            className="bg-slate-200 p-2  w-full justify-between items-center"
          >
            {formats.map((format, index) => (
              <option key={index} value={format}>
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function LettersFilter({
  titleStartsWith,
  setTitleStartsWith,
}: {
  titleStartsWith: string;
  setTitleStartsWith: (newTitle: string) => void;
}) {
  const updateTitleStartsWith = (letter: string) => {
    console.log(letter);
    setTitleStartsWith(letter.toLowerCase());
  };
  const letters: string[] = [
    "all",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  return (
    <div className=" flex flex-1 justify-around px-20 pt-5 bg-slate-50  text-lg">
      {letters.map((letter) => (
        <button
          className={
            titleStartsWith === letter
              ? " font-black"
              : "font-thin text-slate-400 hover:text-black hover:font-black"
          }
          onClick={() => updateTitleStartsWith(letter)}
          key={letter}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Store({
  itemLimitArray,
  itemLimit,
  setItemLimit,
  items,
  isLoading,
  totalItems,
  page,
  setPage,
  formats,
  format,
  setFormat,
  searchTitle,
  setSearchTitle,
  displayMode,
  updateDisplayMode,
  titleStartsWith,
  setTitleStartsWith,
  discountPercentage,
  orderBy,
  setOrderBy,
  orderByArray,
  wishList,
  updateWishList,
  startYear,
  setStartYear,
}: {
  items: Comic[];
  isLoading: boolean;
  totalItems: number;
  page: number;
  setPage: (page: number) => void;
  formats: ComicFormat[];
  format: ComicFormat;
  setFormat: (format: ComicFormat) => void;
  searchTitle: string;
  setSearchTitle: (search: string) => void;
  displayMode: boolean;
  updateDisplayMode: (mode: boolean) => void;
  itemLimitArray: number[];
  itemLimit: number;
  setItemLimit: (newNumber: number) => void;
  titleStartsWith: string;
  setTitleStartsWith: (newTitle: string) => void;
  discountPercentage: number;
  orderBy: ComicOrderBy;
  setOrderBy: (orderBy: ComicOrderBy) => void;
  orderByArray: ComicOrderBy[];
  wishList: Comic[];
  updateWishList: (items: Comic[]) => void;
  startYear: string;
  setStartYear: (year: string) => void;
}) {
  console.log(items);

  const navigate = useNavigate();
  const startIndex = page * itemLimit;

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    navigate(`/store?page=${selectedPage + 1}`);
  };
  //save last page
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page") || "1") - 1;
    setPage(currentPage);
  }, [location.search, setPage]);

  return (
    <section className="  flex-1 flex">
      {isLoading ? (
        <Loading />
      ) : (
        <>
        <div className="h-full w-80 ">
          <div className=" fixed ml-2">
          <Filters
            itemLimit={itemLimit}
            itemLimitArray={itemLimitArray}
            setItemLimit={setItemLimit}
            format={format}
            formats={formats}
            setFormat={setFormat}
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderByArray={orderByArray}
            startYear={startYear}
            setStartYear={setStartYear}
          />
          </div></div>
          <div className="flex flex-col flex-1 relative bg-slate-50">
          <LettersFilter
            titleStartsWith={titleStartsWith}
            setTitleStartsWith={setTitleStartsWith}
          />
          <ItemCards
            items={items}
            startIndex={startIndex}
            currentPage={page}
            displayMode={displayMode}
            updateDisplayMode={updateDisplayMode}
            discountPercentage={discountPercentage}
            numberItems={totalItems}
            wishList={wishList}
            updateWishList={updateWishList}
          />
          <ReactPaginate
            forcePage={page}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            previousClassName={"previous-page"}
            nextClassName={"next-page"}
            onPageChange={(event) => handlePageChange(event.selected)}
            pageCount={Math.ceil(totalItems / itemLimit)}
            breakLabel="..."
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "28px" }}>
                <FaChevronLeft />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "28px" }}>
                <FaChevronRight />
              </IconContext.Provider>
            }
          />
          </div>
        </>
      )}
    </section>
  );
}
