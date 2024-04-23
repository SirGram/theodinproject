import Comic from "../../interfaces/Comic";
import CartComic from "../../interfaces/CartComic";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import fetchComicData from "../../utils/fetchComics";
import IssueCard from "./components/ComicInfo";
import BuyItem from "./components/BuyItem";
import VisitedItems from "../components/VisitedItems";
import ScrollCards from "../../components/ScrollCards";
import fetchItemData from "../../utils/fetchComic";
import ComicInfo from "./components/ComicInfo";
import fetchComic from "../../utils/fetchComic";

export default function CardPage({
  items,
  currentItem,
  setCurrentItem,
  itemLimit,
  isLoading,
  cartItems,
  updateCartItems,
  discountPercentage,
  wishList,
  updateWishList,
}: {
  items: Comic[] ;
  currentItem: Comic | null;
  setCurrentItem: (updateComic: Comic | null) => void;
  itemLimit: number;
  isLoading: boolean;
  cartItems: CartComic[];
  updateCartItems: (items: Comic[] , quantity: number) => void;
  wishList: Comic[];
  updateWishList: (items: Comic[] ) => void;
  discountPercentage: number;
}) {
  const { id } = useParams<{ id: string }>();
  const [comicSeries, setComicSeries] = useState<Comic[]>([]);
  const [visitedItems, setVisitedItems] = useState<Comic[]>([]);
  const [totalNumberIssues, setTotalNumberIssues] = useState<number>(0);

  const updateVisitedItems = (newVisitedItem: Comic | null): void => {
    if (newVisitedItem !== null) {
      const newVisitedItems = [...visitedItems];
      console.log("visited", visitedItems, newVisitedItem);
      const isAlreadyVisited = visitedItems.some(
        (item) => item.id === newVisitedItem.id
      );
      console.log("isAlreadyVisited", isAlreadyVisited);
      if (!isAlreadyVisited) {
        newVisitedItems.unshift(newVisitedItem);
        if (newVisitedItems.length > 12) {
          newVisitedItems.pop();
        }

        setVisitedItems(newVisitedItems);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const targetItem: Comic | null = await fetchComic(Number(id));
        setCurrentItem(targetItem);
        console.log("current item", targetItem);
        const seriesNumberUrl = targetItem?.series?.seriesURI;
        const seriesNumber = seriesNumberUrl?.split("/").pop();

        console.log(seriesNumber);
        if (seriesNumber) {
          const [fetchedSeries, issues] = await fetchComicData(
            seriesNumber,
            undefined,
            undefined,
            undefined,
            100,
            undefined,
            undefined,undefined, 'unset'
          );
          //order by issue
          setComicSeries(
            fetchedSeries.sort((comicA, comicB) => {
              if (
                comicA.issueNumber !== undefined &&
                comicB.issueNumber !== undefined
              ) {
                return comicB.issueNumber - comicA.issueNumber;
              }

              return 0;
            })
          );
          setTotalNumberIssues(issues);
        }
        console.log(comicSeries);
      } catch (error) {
        console.error("Error fetching comic series data:", error);
      }
    })();
  }, [id]);

  useEffect(() => {
    updateVisitedItems(currentItem);
  }, [currentItem]);

  const navigate = useNavigate();
  /* if (!isLoading && (parsedIndex < 0 || parsedIndex >= items.length)) {
    console.log(parsedIndex, items);
    navigate("/notfound");
  } */
  const handlePrevButton = () => {
    const newIndex = parsedIndex - 1;
    if (newIndex >= 0) navigate(`/store/${newIndex}`);
  };
  const handleNextButton = () => {
    const newIndex = parsedIndex + 1;
    if (newIndex < items.length) navigate(`/store/${newIndex}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className="flex px-10 my-5  w-full">
      <div className="flex flex-col w-full px-5 mt-3">
        <ComicInfo
          currentItem={currentItem}
          handlePrevButton={handlePrevButton}
          handleNextButton={handleNextButton}
        />
        <div className="flex gap-10  w-full">
          <ScrollCards
            items={comicSeries}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            title={`Other Issues (${totalNumberIssues})`}
          />
        </div>
        <div className="mt-6 w-full flex flex-1">
          <ScrollCards
            items={visitedItems}
            title="Recently Seen"
            currentItem={null}
            setCurrentItem={() => {}}
          />
        </div>
      </div>
      <div className=" flex-1 flex-col ">
        {" "}
        {comicSeries && (
          <BuyItem
            item={currentItem}
            seriesItems={comicSeries} // Pass seriesItems only when it's defined
            cartItems={cartItems}
            updateCartItems={updateCartItems}
            discountPercentage={discountPercentage}
            wishList={wishList}
            updateWishList={updateWishList}
          />
        )}
      </div>
    </section>
  );
}
