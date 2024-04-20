import CardImage from "./CardImage";
import { Link } from "react-router-dom";
type Props = {
  title: string;
  path: string;
  price: number;
  displayMode: boolean;
  discountPercentage: number;
  startIndex: number;
  index: number;
  currentPage: number;
};

export default function Card({
  title,
  path,
  price,
  displayMode,
  discountPercentage,
  startIndex,
  index,
  currentPage,
}: Props) {
  return displayMode ? (
    <div className=" bg-white mb-5 rounded-sm overflow-hidden w-52 drop-shadow-md">
     
     <Link
              to={`/store/${startIndex + index}?page=${currentPage}`}
              className="flex w-fit"
            >
      <div className=" h-80 ">
        <CardImage path={path} title={title} />
      </div></Link>
      
      <div>
        <div className="text-center p-3 flex justify-center items-center flex-col">

        <div  className="  overflow-hidden  overflow-ellipsis line-clamp-2 h-14 w-full mb-3 ">
            <Link
              to={`/store/${startIndex + index}?page=${currentPage}`}
              className="flex w-fit"
            >
              <h4 className="text-lg hover:underline">
                {title}
              </h4>
            </Link>
          </div>
          <div className="flex items-center w-full justify-between px-2">
            <h5 className=" line-through">$ {price}</h5>
            <h5 className="  border-2 border-red-500 text-red-500 px-1 w-max">
              {discountPercentage}% OFF
            </h5>
          </div>
          <h3 className=" font-semibold mt-1">
            $ {(price - (price * discountPercentage) / 100).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex  bg-white hover:bg-blue-100 mb-5 rounded-sm overflow-hidden  drop-shadow-md">
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
          <div  className="  overflow-hidden  overflow-ellipsis line-clamp-2 h-14 w-full  ">
            <Link
              to={`/store/${startIndex + index}?page=${currentPage}`}
              className="flex w-fit"
            >
              <h4 className="hover:underline">
                {title}
              </h4>
            </Link>
          </div>
          <div className="flex items-center w-full justify-between ">
            <h5 className=" line-through">$ {price}</h5>
            <h5 className="  border-2 border-red-500 text-red-500 px-1 w-max">
              {discountPercentage}% OFF
            </h5>
          </div>
          <h3 className=" font-semibold mt-1">
            $ {(price - (price * discountPercentage) / 100).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}
