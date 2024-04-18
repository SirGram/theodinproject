import Comic from "../interfaces/Comic";
import CartComic from "../interfaces/CartComic";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import fetchComicData from "../utils/fetchComicData";
import IssueCards from "../components/IssueCards";
import IssueCard from "../components/IssueCard";
import BuyItem from "../components/BuyItem";

export default function CardPage({
  items,
  currentItem,
  setCurrentItem,
  isLoading,
  cartItems, updateCartItems
}: {
  items: Comic[] | [];
  currentItem: Comic | null;
  setCurrentItem: (updateComic: Comic | null) => void;
  isLoading: boolean;
  cartItems: CartComic[];
  updateCartItems: (item: Comic | null, quantity: number) => void;
}) {
  const { index } = useParams<{ index: string }>();
  const parsedIndex = parseInt(index || "") % 100;
  const [comicSeries, setComicSeries] = useState<Comic[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        const targetItem: Comic | null = items[parsedIndex] || null;
        setCurrentItem(targetItem);
        console.log("current item", targetItem);
        const seriesNumberUrl = targetItem.series?.seriesURI;
        const seriesNumber = seriesNumberUrl?.split("/").pop();

        console.log(seriesNumber);
        if (seriesNumber) {
          const [fetchedSeries, totalNumberIssues] = await fetchComicData(seriesNumber);
          setComicSeries(fetchedSeries);
        }
        console.log(comicSeries);
      } catch (error) {
        console.error("Error fetching comic series data:", error);
      }
    })();
  }, [parsedIndex, items]);

  const navigate = useNavigate();
  if (!isLoading && (parsedIndex < 0 || parsedIndex >= items.length)) {
    console.log(parsedIndex, items);
    navigate("/notfound");
  }
  const handlePrevButton = () => {
    const newIndex = parsedIndex - 1;
    if (newIndex >= 0) navigate(`/store/${newIndex}`);
  };
  const handleNextButton = () => {
    const newIndex = parsedIndex + 1;
    if (newIndex < items.length) navigate(`/store/${newIndex}`);
  };

  return (isLoading ?
    <Loading/>
    :
    (
    <section className="flex flex-col flex-1 py-10 px-5">
      <IssueCard
        currentItem={currentItem}
        handlePrevButton={handlePrevButton}
        handleNextButton={handleNextButton}
      />
      <div className="flex  w-full">
        <BuyItem item={currentItem} cartItems = {cartItems} updateCartItems = {updateCartItems}/>
        <IssueCards
          items={comicSeries}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      </div>
    </section>)
  );
}
