import Comic from "../interfaces/Comic";
import CardImage from "../components/CardImage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "./Loading.tsx";
import { useState } from "react";

export default function IssueCard({
  currentItem,
  handlePrevButton,
  handleNextButton,
}: {
  currentItem: Comic | null;
  handlePrevButton: () => void;
  handleNextButton: () => void;
}) {
  const getFirstImage = () => {
    let index = 0
    if (currentItem !== null) {
      console.log(currentItem.thumbnail?.path)
      console.log(currentItem.images)
      index = currentItem.images.findIndex(
        (image) => image.path === currentItem.thumbnail?.path
      );
      
    }
    console.log(index)
   
    return index;
  };
  const [activeImage, setActiveImage] = useState<number>(()=>getFirstImage());
  console.log('activeImage ',activeImage)
  return (
    <div className="flex flex-col mb-5 w-full">
      <div className="justify-end w-full flex mb-2">
        <button
          onClick={handlePrevButton}
          className="text-xl px-2 hover:opacity-50 transition-opacity"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNextButton}
          className="text-xl px-2 hover:opacity-20 transition-opacity"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex gap-5 bg-slate-100  w-full h-full">
        <div className="flex-1 shrink-0 flex flex-col">
          <div className="h-80 w-56">
            <CardImage
              path={`${currentItem?.images[activeImage]?.path}.${currentItem?.images[activeImage]?.extension}`}
              title={currentItem?.title}
            />
          </div>
          <div className="my-3 mx-2 h-12 flex gap-2">
            {currentItem &&
              currentItem.images.map((image, index) => (
                <div
                  className={`h-full w-9 ${
                    image === currentItem.images[activeImage]
                      ? " pointer-events-none"
                      : "p-1 pt-0 hover:opacity-50"
                  }`}
                >
                  <button onClick={() => setActiveImage(index)}>
                    <CardImage
                      path={`${image?.path}.${image.extension}`}
                      title={currentItem?.title}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className=" mb-5">{currentItem?.title}</h3>
          <div className="flex flex-col justify-center gap-1">
            <p className=" mb-1">
              <span className="mr-2 font-semibold">SERIES:</span>
              <span>{currentItem?.series?.seriesName}</span>
            </p>
            <p className=" mb-1">
              {currentItem?.creators?.length !== undefined &&
              currentItem.creators.length > 1 ? (
                <span className="mr-2 font-semibold">CREATORS:</span>
              ) : (
                <span className="mr-2 font-semibold">CREATOR:</span>
              )}
              <span>
                {currentItem?.creators?.length === 0 ? (
                  <span>Unknown</span>
                ) : (
                  currentItem?.creators?.map((creator, index) => (
                    <span key={index}>
                      {creator}
                      {index !== (currentItem?.creators?.length ?? 0) - 1 &&
                        ", "}
                    </span>
                  ))
                )}
              </span>
            </p>
            <p className=" mb-1">
              <span className="mr-2 font-semibold">PAGES:</span>
              <span>
                {currentItem?.pageCount === 0
                  ? "Unknown"
                  : currentItem?.pageCount}
              </span>
            </p>
            <p className=" mb-1">
              <span className="mr-2 font-semibold">FORMAT:</span>
              <span>{currentItem?.format}</span>
            </p>
            <p>
              <span className="mr-2 font-semibold">DESCRIPTION:</span>
              <span>
                {" "}
                {currentItem?.description ||
                  currentItem?.description2 ||
                  "No description available"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function usestate<T>(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
