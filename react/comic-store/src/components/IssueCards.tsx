import React, { useRef } from "react";
import Comic from "../interfaces/Comic";
import CardImage from "./CardImage";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function IssueCards({
  currentItem,
  items,
  setCurrentItem,
}: {
  currentItem: Comic | null;
  items: Comic[];
  setCurrentItem: (updateComic: Comic | null) => void;
}) {
  const onClickCard = (item: Comic) => {
    console.log(item);
    setCurrentItem(item);
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth: number | undefined =
        scrollContainerRef.current.firstElementChild?.clientWidth;
      if (cardWidth !== undefined) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = Math.max(cardWidth, containerWidth - cardWidth);
        scrollContainerRef.current.scrollBy({
          left: -scrollWidth!,
          behavior: "smooth",
        });
      }
    }
  };
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const canScrollLeft = container.scrollLeft > 0;
        const canScrollRight =
        container.scrollLeft + container.clientWidth < container.scrollWidth -10;
        console.log( container.scrollLeft,   container.clientWidth, container.scrollWidth)
        // Update state variables
        setCanScrollLeft(canScrollLeft);
        setCanScrollRight(canScrollRight);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth: number | undefined =
        scrollContainerRef.current.firstElementChild?.clientWidth;
      if (cardWidth !== undefined) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = Math.max(cardWidth, containerWidth - cardWidth);
        scrollContainerRef.current.scrollBy({
          left: scrollWidth!,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="flex flex-col ml-9 flex-1 overflow-hidden">
      
      <div className="flex w-full justify-end mb-2">
        <button
          onClick={scrollLeft}
          className={`text-xl px-2  flex items-center ${
            canScrollLeft ? "hover:opacity-50 transition-opacity" : ""
          } ${!canScrollLeft && "opacity-10"}`}
          disabled={!canScrollLeft}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className={`text-xl px-2  flex items-center ${
            canScrollRight ? "hover:opacity-50 transition-opacity" : ""
          } ${!canScrollRight && "opacity-10"}`}
          disabled={!canScrollRight}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className=" bg-slate-300">
      <div
        ref={scrollContainerRef}
        className=" bg-slate-100 flex flex-row overflow-x-hidden w-auto "
        style={{
          scrollSnapType: "x mandatory", // Enable horizontal scroll snapping
        }}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col justify-center bg-white border-solid border-8 ${
              currentItem && currentItem.title === item.title
                ? " border-sky-500"
                : "border-slate-200"
            }`}
            onClick={() => onClickCard(item)}
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="h-48 w-32">
              <CardImage
                path={`${item.thumbnail?.path}.${item.thumbnail?.extension}`}
                title={item.title}
                height="full"
              />
            </div>

            <h4 className=" text-center w-full">#{item.issueNumber}</h4>
          </button>
        ))}
      </div></div>
    </section>
  );
}
