import CardImage from "./CardImage";
type Props = {
  title: string;
  path: string;
  price: number;
  displayMode: boolean;
};

export default function Card({ title, path, price, displayMode }: Props) {
  return displayMode ? (
    <div className=" bg-white hover:bg-blue-100 mb-5 rounded-sm overflow-hidden w-52 drop-shadow-md">
      <div className=" h-80 ">
        <CardImage path={path} title={title} />
      </div>
      <div>
        <div className="text-center p-3">
          <h4 className=" mb-4  text-lg h-14 overflow-hidden  overflow-ellipsis line-clamp-2">
            {title}
          </h4>
          <h3 className=" font-semibold">$ {price}</h3>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex  bg-white hover:bg-blue-100 mb-5 rounded-sm overflow-hidden  drop-shadow-md">
    <div className=" h-40 w-28">
      <CardImage path={path} title={title} />
    </div>
    <div className="flex-1">
      <div className=" flex flex-col justify-around  h-full w-full  px-10">
        <h4 className=" mb-4  overflow-hidden  overflow-ellipsis line-clamp-2 w-full">
          {title}
        </h4>
        <h3 className=" font-semibold w-full">$ {price}</h3>
      </div>
    </div>
  </div>
  );
}
