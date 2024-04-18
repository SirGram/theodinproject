import Comic from "../interfaces/Comic";
import CardImage from "../components/CardImage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "./Loading.tsx";

export default function IssueCard({
  currentItem,
  handlePrevButton,
  handleNextButton,
}: {
  currentItem: Comic | null;
  handlePrevButton: () => void;
  handleNextButton: () => void;
}) {
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
          <div className="h-80 shrink-0">
          <CardImage
            path={`${currentItem?.thumbnail?.path}.${currentItem?.thumbnail?.extension}`}
            title={currentItem?.title}
          /></div>
          <div className="p-5 flex-1">
            <h3 className=" mb-5">{currentItem?.title}</h3>
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
            <p className=" mb-1">
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
  );
}
