import ItemCards from "../../components/ItemCards.tsx";
import Comic from "../../interfaces/Comic.tsx";
import { useMemo, useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Loading from "../../components/Loading.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { ComicOrderBy, ComicFormat } from "../../interfaces/types.tsx";

export default function Store() {
  return (
    <section className="  flex-1 flex w-full justify-center gap-20 p-10">
      <Link to="/store/books">
        <div className="bg-slate-100 w-80 h-96">
          <h3 className="text-center">Books</h3>
        </div>
      </Link> <Link to="/store/merch">
      <div className="bg-slate-100 w-80 h-96">
        <h3 className="text-center">Merchandising</h3>
      </div> </Link>
    </section>
  );
}
