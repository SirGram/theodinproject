import Comic from "../interfaces/Comic";
import CardImage from "../components/CardImage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function CardPage({
  items,
  currentItem,
  setCurrentItem,
}: {
  items: Comic[] | [];
  currentItem: Comic | null;
  setCurrentItem: (updateComic: Comic | null) => void;
}) {
  const { itemId } = useParams<{ itemId: string }>();
  useEffect(() => {
    const targetItem: Comic | null =
      items.find((item) => {
        console.log(itemId);
        console.log(item.id.toString());
        console.log(itemId === item.id.toString());
        return item.id.toString() === itemId;
      }) || null;

    setCurrentItem(targetItem);
    console.log(targetItem);
  }, [itemId]);

  if (currentItem == null) return null;
  return (
    <div className="flex">
      <CardImage
        path={`${currentItem?.thumbnail?.path}.${currentItem?.thumbnail?.extension}`}
        title={currentItem?.title}
      />
      <div>
        <h1>{currentItem?.title}</h1>
        <h1>{currentItem?.seriesName}</h1>
        <h1>
          Creator: {currentItem?.creators.map((creator, index) => (
            <span key={index}>
                {creator}
             {index !== currentItem.creators.length - 1 && ", "}
            </span>
            
          ))}
        </h1>

        <h1>PageCount: {currentItem?.pageCount}</h1>
        <h1>Description: {currentItem?.description || currentItem?.description2 || 'No description available'}</h1>

      </div>
    </div>
  );
}
