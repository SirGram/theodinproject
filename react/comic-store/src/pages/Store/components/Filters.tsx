import { useState } from "react";
import { ComicFormat, ComicOrderBy } from "../../../interfaces/types";
import { FaSearch } from "react-icons/fa";

export default function Filters({
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
     
        <div className="p-5 flex flex-1 gap-4 items-start justify-start flex-col">
          <h3>Filters</h3>
          <div className="flex bg-slate-100 items-center  h-10 w-full justify-between">
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
    );
  }
  
