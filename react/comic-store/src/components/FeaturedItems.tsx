import Comic from "../interfaces/Comic";
import ItemCards from "./ItemCards.tsx";

export default function FeaturedItems({ items }: { items: Comic[] }) {
    console.log(items)
  return (
    <section className="p-8 bg-gray-100">
      <h2 className=" font-semibold text-4xl text-center mb-9" >New Comics</h2>
      <ItemCards items = {items}/>
      
    </section>
  );
}
