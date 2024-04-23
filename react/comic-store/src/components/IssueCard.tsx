import Comic from "../interfaces/Comic";
import CardImage from "../components/CardImage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "./Loading.tsx";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

export default function IssueCard({
  currentItem,
  handlePrevButton,
  handleNextButton,
}: {
  currentItem: Comic | null;
  handlePrevButton: () => void;
  handleNextButton: () => void;
}) {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [showAllContent, setShowAllContent] = useState<boolean>(false);

  return (
    <div className="flex flex-col mb-7 w-full">
      <div className="justify-between w-full flex mb-2">
        <Link to="/store" className="flex">
          <button className=" text-2xl px-2 hover:opacity-50 transition-opacity">
            <MdArrowBack />
          </button>
        </Link>
        <div className="flex">
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
      </div>

      <div className="flex gap-1   w-full h-full">
        <div className=" shrink-0 flex flex-col bg-white">
          <div className="h-80 w-56">
            {currentItem && (
              <CardImage
                path={`${currentItem.images[activeImage]?.path}.${currentItem?.images[activeImage].extension}`}
                title={currentItem?.title}
              />
            )}
          </div>
          <div className="my-3 mx-2 w-56 flex gap-2 flex-wrap">
            {currentItem &&
              currentItem.images.map((image, index) => (
                <div
                  className={` w-9 ${
                    image === currentItem.images[activeImage]
                      ? " pointer-events-none"
                      : "p-1 hover:opacity-50"
                  }`}
                  key={index}
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

        <div className=" h-fit">
          <div
            className={`p-5 flex-1 bg-slate-100 flex flex-col overflow-hidden ${
              showAllContent ? "h-full" : "h-96"
            }`}
          >
            <h3 className="mb-5">{currentItem?.title}</h3>
            <div className="flex flex-col justify-center gap-1">
              <p className="mb-1">
                <span className="mr-2 font-semibold">SERIES:</span>
                <span>{currentItem?.series?.seriesName}</span>
              </p>
              <p className="mb-1">
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
              <p className="mb-1">
                <span className="mr-2 font-semibold">PAGES:</span>
                <span>
                  {currentItem?.pageCount === 0
                    ? "Unknown"
                    : currentItem?.pageCount}
                </span>
              </p>
              <p className="mb-1">
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
          </div>{" "}
          <div className="w-full justify-end flex bg-slate-100 py-1 pr-5">
          <button
            onClick={() => setShowAllContent(!showAllContent)}
            className="text-md px-2 hover:opacity-50 transition-opacity"
          >
            {showAllContent ? 'Show Less' : 'Show More'}
          </button></div>
        </div>
      </div>
    </div>
  );
}
