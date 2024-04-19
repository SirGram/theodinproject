import ItemCards from "../components/ItemCards.tsx";
import Comic from "../interfaces/Comic.tsx";
import { useMemo, useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Loading from "../components/Loading.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ComicFormat } from "../interfaces/ComicFormat.tsx";

function Filters({
  itemLimitArray,
  itemLimit,
  setItemLimit,
  format,
  setFormat,
  formats,
  titleStartsWith, setTitleStartsWith
}  : {
  itemLimitArray: number[];
  itemLimit: number;
  setItemLimit: (newNumber: number) => void;
  format: ComicFormat;
  setFormat: (format: ComicFormat) => void;
  formats: string[];
  titleStartsWith:string, setTitleStartsWith:(newTitle:string)=>void
}) {
  const searchValue = useRef<HTMLInputElement>(null);

  const updateItemLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemLimit(Number(e.target.value));
  };
  const updateFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("event", e.target.value);
    setFormat(e.target.value as ComicFormat);
  };
  const updateTitleStartsWith = (letter:string) => {
    console.log(letter)
    setTitleStartsWith(letter.toLowerCase());
  };
  const letters: string[] = ["#", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  const handleSearchButton = () => {
    /*  filterByName(searchValue.current?.value || '') */
  };
  return (
    <>
    
    <div className="my-5 flex items-center justify-around ">
      <div className="flex bg-slate-100 items-center  ">
        <div className=" scale-x-[-1] opacity-30 px-2">
          <FaSearch />
        </div>
        <input
          ref={searchValue}
          type="text"
          placeholder="Search by title"
          className=" w-40 bg-transparent h-10"
          onChange={() => handleSearchButton()}
        />
      </div>

      <div>
        <div className="bg-slate-100 pl-2 ">
          <span className="mr-2">Items per page</span>
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
      </div>
      <div>
        <div className="bg-slate-100 pl-2 ">
          <span className="mr-2">Format: </span>
          <select
            onChange={updateFormat}
            value={format}
            className="bg-slate-200 p-2 "
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
    <div className="w-full flex justify-around px-20">
    {letters.map(letter => (
      <button 
      className={titleStartsWith === letter ? " font-black" : "font-thin text-slate-400"}
      onClick={()=>updateTitleStartsWith(letter)}
      key={letter}>{letter.toUpperCase()}</button>
    ))}
    </div>
    </>
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
  displayMode,
  updateDisplayMode,
  titleStartsWith, setTitleStartsWith
}: {
  items: Comic[];
  isLoading: boolean;
  totalItems: number;
  page: number;
  setPage: (page: number) => void;
  formats: ComicFormat[];
  format: ComicFormat;
  setFormat: (format: ComicFormat) => void;
  displayMode: boolean;
  updateDisplayMode: (mode: boolean) => void;  
  itemLimitArray: number[];
  itemLimit: number;
  setItemLimit: (newNumber: number) => void;
  titleStartsWith:string, setTitleStartsWith:(newTitle:string)=>void
}) {
  console.log(items);


  const navigate = useNavigate();
  const startIndex = page * itemLimit;

  /*  
  useEffect(() => {
    setFilteredItems(items)
  
  }, [items])
  const [filteredItems, setFilteredItems] = useState<Comic[]>(items);
  const paginatedItems: Comic[] = useMemo(() => {
    return filteredItems.slice(startIndex, startIndex + numberItems);
  }, [filteredItems, page, numberItems]); */

  /*   const filterByName = (name: string) => {
    console.log(name)
    console.log('items', items)
    const newFilteredItems = items.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()));
    console.log('search items', newFilteredItems)
    setFilteredItems(newFilteredItems);
  }; */


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
    <section className="  flex-1 ">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Filters
            itemLimit={itemLimit}
            itemLimitArray={itemLimitArray}
            setItemLimit={setItemLimit}

            format={format}
            formats={formats}
            setFormat={setFormat}
            /*  filterByName = {filterByName} */
            
  titleStartsWith= {titleStartsWith} setTitleStartsWith={setTitleStartsWith}
          />
          <ItemCards
            items={items}
            startIndex={startIndex}
            currentPage={page}
            displayMode={displayMode}
            updateDisplayMode={updateDisplayMode}
          />
          <ReactPaginate
            forcePage={page}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            previousClassName={"previous-page"}
            nextClassName={"next-page"}
            onPageChange={(event) => handlePageChange(event.selected)}
            pageCount={Math.ceil((totalItems / itemLimit)) }
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
        </>
      )}
    </section>
  );
}
