import ItemCards from "../../components/ItemCards.tsx";
import Comic from "../../interfaces/Comic.tsx";
import { useMemo, useState, useEffect, useRef, ReactNode } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Loading from "../../components/Loading.tsx";
import { useLocation, useNavigate } from "react-router-dom";


export default function Books({
  itemLimit,

  items,
  isLoading,
  totalItems,
  page,
  setPage,

  displayMode,
  updateDisplayMode,

  discountPercentage,

  wishList,
  updateWishList,
  children,
}: {
  items: Comic[];
  isLoading: boolean;
  totalItems: number;
  page: number;
  setPage: (page: number) => void;

  displayMode: boolean;
  updateDisplayMode: (mode: boolean) => void;
  itemLimitArray: number[];
  itemLimit: number;
  setItemLimit: (newNumber: number) => void;
  discountPercentage: number;
  wishList: Comic[];
  updateWishList: (items: Comic[]) => void;
  children: ReactNode;
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
    <section className="  flex-1 flex ">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="h-screen  flex relative ">{children} </div>
          <div className="flex flex-col  flex-1 h-screen">
          <div className="flex flex-col overflow-y-scroll flex-1 h-screen">

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
          /></div>
          <div className="py-5 bg-slate-50">
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
          /></div></div>
        </>
      )}
    </section>
  );
}
