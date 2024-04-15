import ItemCards from "../components/ItemCards.tsx";
import Comic from "../interfaces/Comic.tsx";
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Loading from "./Loading.tsx";

export default function Store({
  items,
  numberItems,
  isLoading,
}: {
  items: Comic[];
  numberItems: number;
  isLoading: boolean;
}) {
  console.log(items);
  const [page, setPage] = useState<number>(0);
  const filterData: Comic[] = useMemo(() => {
    return items.filter((_, index) => {
      return index >= page * numberItems && index < (page + 1) * numberItems;
    });
  }, [items, page]);

  return (
    <section className=" bg-gray-100 pt-20 px-10 flex-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ItemCards items={filterData} />
          <ReactPaginate 
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"active"}
            previousClassName={'previous-page'}
            nextClassName={'next-page'}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(items.length / numberItems)}
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
