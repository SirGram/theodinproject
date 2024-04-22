import Comic from "../interfaces/Comic";
import ItemCards from "../components/ItemCards";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function WishList({
  wishList,
  updateWishList,
  discountPercentage,
  displayMode,
  updateDisplayMode,
  isWishListOpen,
  toggleWishList,
}: {
  wishList: Comic[] | [];
  updateWishList: (items: Comic[] | []) => void;
  discountPercentage: number;
  displayMode: boolean;
  updateDisplayMode: (mode: boolean) => void;
  isWishListOpen: boolean;
  toggleWishList: () => void;
}) {
  return (
    <>
      {isWishListOpen && (
        <div className="h-full top-0 flex items-center justify-center w-full backdrop-brightness-35 z-20 absolute">
          <div className=" bg-white w-3/4 relative h-3/4 flex  rounded-sm overflow-hidden">
            <button
              className="hover:opacity-50 bg-slate-50 text-5xl absolute left-0 top-0 flex items-center justify-center h-8 w-8 outline-slate-950 outline"
              onClick={toggleWishList}
            >
              <IoClose />
            </button>
            {wishList.length === 0 ? (
              <div className="flex flex-col flex-1 w-ful text-center p-5">
                <h2 className="mb-10">WishList is empty</h2>
              </div>
            ) : (
              <div className=" flex flex-col flex-1  max-h-full w-full">
                {" "}
                <h2 className="p-5 text-center">
                  Wishlist
                </h2>
                <div className=" flex flex-1 bg-slate-100 flex-col overflow-y-scroll max-h-full w-full">
                  <ItemCards
                    items={wishList}
                    startIndex={1}
                    numberItems={wishList.length}
                    currentPage={1}
                    displayMode={displayMode}
                    discountPercentage={discountPercentage}
                    updateDisplayMode={updateDisplayMode}
                    wishList={wishList}
                    updateWishList={updateWishList}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
