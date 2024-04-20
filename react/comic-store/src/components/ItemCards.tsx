import React from "react";
import Comic from "../interfaces/Comic";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa6";

export default function ItemCards({
  items,
  startIndex,
  currentPage,
  displayMode,
  updateDisplayMode,
  discountPercentage,
  numberItems,
}: {
  items: Comic[];
  startIndex: number;
  currentPage: number;
  displayMode: boolean;
  updateDisplayMode: (mode: boolean) => void;
  discountPercentage: number;
  numberItems: number;
}) {
  return (
    <div className="py-5 px-10 gap-2 bg-slate-100">
      <div className="flex mb-4  gap-2 w-full justify-end">
        <h4 className="flex-1 font-thin italic">{numberItems} results</h4>
        <button
          className={`text-2xl p-1 ${
            displayMode
              ? "bg-slate-300  pointer-events-none"
              : "bg-transparent  hover:opacity-50"
          }`}
          onClick={() => updateDisplayMode(true)}
        >
          <MdGridView />
        </button>
        <button
          className={`text-2xl p-1 ${
            !displayMode
              ? "bg-slate-300 pointer-events-none"
              : "bg-transparent  hover:opacity-50 "
          }`}
          onClick={() => updateDisplayMode(false)}
        >
          <FaList />
        </button>
      </div>
      <div
        className={`${
          displayMode ? "grid grid-cols-auto-fit gap-2" : "flex flex-col"
        } `}
      >
        {items.map((item, index) => (
          <div key={item.id} className="flex  justify-center ">
           
              <Card
                path={`${item?.images[0]?.path}.${item?.images[0]?.extension}`}
                title={item.title}
                price={item.price}
                discountPercentage={discountPercentage}
                displayMode={displayMode}
                startIndex={startIndex}
                index={index}
                currentPage={currentPage}
              />
       
          </div>
        ))}
      </div>
    </div>
  );
}
