import { FaHeart, FaHeartBroken } from "react-icons/fa";
import CardImage from "./CardImage";
import { Link } from "react-router-dom";
import Comic from "../interfaces/Comic";
type Props = {
  item: Comic;
  displayMode: boolean;
  discountPercentage: number;
  startIndex: number;
  index: number;
  currentPage: number;
  wishList: Comic[];
  updateWishList: (items: Comic[]) => void;
};

export default function Card({
  item,
  displayMode,
  discountPercentage,
  startIndex,
  index,
  currentPage,
  wishList,
  updateWishList,
}: Props) {
  const path = `${item?.images[0]?.path}.${item?.images[0]?.extension}`;
  const title = item.title;
  const price = item.price;

  const isItemOnWishList: boolean = !!wishList?.find(
    (wishListItem) => wishListItem.id === item.id
  );

  return displayMode ? (
    <div className=" bg-white   mb-5 rounded-sm overflow-hidden w-52 drop-shadow-md">
      <div className="hover:bg-blue-100">
        <Link
          to={`/store/${item.id}?page=${currentPage}`}
          className="flex w-fit"
        >
          <div className=" h-80 ">
            <CardImage path={path} title={title} />
          </div>
        </Link>

        <div>
          <div className="text-center p-3 flex justify-center items-center flex-col">
            <div className="  overflow-hidden  overflow-ellipsis line-clamp-2 h-14 w-full mb-3 ">
              <Link
                to={`/store/${startIndex + index}?page=${currentPage}`}
                className="flex w-fit"
              >
                <h4 className="text-lg hover:underline">{title}</h4>
              </Link>
            </div>

            <div>
              <div className="flex gap-2 items-center w-full justify-between px-2">
                <h5 className=" line-through">${price}</h5>
                <h5 className="  border-2 border-red-500 text-red-500 px-1 w-max">
                  {discountPercentage}% OFF
                </h5>
              </div>

              <h3 className=" font-semibold mt-1">
                ${(price - (price * discountPercentage) / 100).toFixed(2)}
              </h3>
            </div>
          </div>{" "}
        </div>
      </div>
      <button
        className="p-2 py-3 bg-blue-400 w-full flex items-center hover:opacity-50 z-10"
        onClick={() => updateWishList([item])}
      >
        {isItemOnWishList ? (
          <FaHeartBroken className="w-full text-xl text-white" />
        ) : (
          <FaHeart className="w-full text-xl text-white" />
        )}
      </button>
    </div>
  ) : (
    <div className="w-full flex  bg-white mb-5 rounded-sm overflow-hidden  drop-shadow-md">
      <div className="flex-1 flex  hover:bg-blue-100">
        <Link
          to={`/store/${startIndex + index}?page=${currentPage}`}
          className=""
        >
          <div className=" h-40 w-28">
            <CardImage path={path} title={title} />
          </div>
        </Link>
        <div className="flex-1">
          <div className=" flex flex-col justify-around  h-full w-full  px-10 py-2">
            <div className="  overflow-hidden  overflow-ellipsis line-clamp-2 h-14 w-full  ">
              <Link
                to={`/store/${startIndex + index}?page=${currentPage}`}
                className="flex w-fit"
              >
                <h4 className="hover:underline">{title}</h4>
              </Link>
            </div>
            <div className="flex items-center w-full justify-between ">
              <h5 className=" line-through">${price}</h5>
              <h5 className="  border-2 border-red-500 text-red-500 px-1 w-max">
                {discountPercentage}% OFF
              </h5>
            </div>
            <h3 className=" font-semibold mt-1">
              ${(price - (price * discountPercentage) / 100).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
      <button
        className="w-20 p-2 bg-blue-400  flex items-center hover:opacity-50 z-10"
        onClick={() => updateWishList([item])}
      >
        {isItemOnWishList ? (
          <FaHeartBroken className="w-full text-xl text-white" />
        ) : (
          <FaHeart className="w-full text-xl text-white" />
        )}
      </button>
    </div>
  );
}
