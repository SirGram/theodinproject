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
  displayMode, updateDisplayMode
}: {
  items: Comic[];
  startIndex: number;
  currentPage: number;displayMode: boolean, updateDisplayMode: (mode:boolean)=> void
}) {
 

  return (
    <div className="py-5 px-10 gap-2 bg-slate-100">
      <div className="flex mb-4  gap-2 w-full justify-end">
      <button 
       className={`text-2xl p-1 ${
        displayMode ? "bg-slate-300  pointer-events-none" : "bg-transparent  hover:opacity-50"
      }`}
      
      onClick={() => updateDisplayMode(true)}><MdGridView /></button>
      <button
      className={`text-2xl p-1 ${
        !displayMode ? "bg-slate-300 pointer-events-none" : "bg-transparent  hover:opacity-50 "
      }`}
      onClick={() => updateDisplayMode(false)}><FaList /></button></div>
      <div className={`${displayMode? 'grid grid-cols-auto-fit gap-2' : 'flex flex-col'} `}>
        {items.map((item, index) => (
          <div key={item.id} className="flex  justify-center ">
            <Link to={`/store/${startIndex + index}?page=${currentPage}`} className="w-full">
              <Card
                path={`${item.thumbnail?.path}.${item.thumbnail?.extension}`}
                title={item.title}
                price={item.price}
                displayMode={displayMode}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
