import Comic from "../interfaces/Comic";
import CartComic from "../interfaces/CartComic";
export default function BuyItem({
  item,
  cartItems,
  updateCartItems,
  discountPercentage,
  seriesItems,
}: {
  item: Comic | null;
  cartItems: CartComic[];
  updateCartItems: (items: Comic[] | null, quantity: number) => void;
  discountPercentage: number;
  seriesItems: Comic[] | [];
}) {
  const quantity: number = 1;

  const seriesPrice: number = parseFloat(
    seriesItems
      .map((item) => Number(item.price)) // Map each item to its price
      .reduce((total, price) => total + price, 0)
      .toFixed(2)
  ); // Sum up the prices
  const discountedSeriesPrice: number = parseFloat(
    (seriesPrice - (seriesPrice * discountPercentage) / 100).toFixed(2)
  );

  const isItemInCart = (): boolean => {
    return cartItems.some((cartItem) => cartItem.comic.id === item?.id);
  };
  const AreItemsInCart = (): boolean => {
    return seriesItems.every((seriesItem) =>
      cartItems.some((cartItem) => cartItem.comic.id === seriesItem?.id)
    );
  };

  const addSeriesToCart = () => {
    console.log("add series", seriesItems);
    updateCartItems(seriesItems, quantity);
  };
  return (
    <section className=" bg-slate-100 w-80 p-5 mt-10 flex flex-col justify-between">
      <div>
        <h3 className="mb-4">Item</h3>
        <div className=" text-center flex flex-col h-full justify-around">
          <div className="justify-around flex  items-center">
            <h5 className=" line-through">${item?.price}</h5>
            <h5 className="  border-2 border-red-500 text-red-500 px-1 w-max">
              {discountPercentage}% OFF
            </h5>
          </div>
          <h2 className=" font-semibold mt-2">
            ${(item?.price - (item?.price * discountPercentage) / 100).toFixed(
              2
            )}
          </h2>
        </div>{" "}
        <button
          className={`bg-orange-700 font-semibold text-white px-2 py-1 rounded-sm mt-3 w-full transition-opacity hover:opacity-50 ${
            isItemInCart() ? "pointer-events-none" : ""
          }`}
          onClick={() => updateCartItems([item], quantity)}
        >
          {isItemInCart() ? <h3>Added to cart!</h3> : <h3>Add Item to Cart</h3>}
        </button>
      </div>
      <div className="mt-7">
        <h3 className="mb-4">Series</h3>
        <div className=" text-center flex flex-col h-full justify-around">
          <div className="justify-around flex  items-center">
            <h5 className=" line-through">${seriesPrice}</h5>
            <h5 className="  border-2 border-red-500 text-red-500 px-1 w-max">
              {discountPercentage}% OFF
            </h5>
          </div>
          <h2 className=" font-semibold mt-2">${discountedSeriesPrice}</h2>
        </div>
        <button
          className={`bg-orange-700 font-semibold text-white px-2 py-1 rounded-sm mt-3 w-full transition-opacity hover:opacity-50 ${
            AreItemsInCart() ? "pointer-events-none" : ""
          }`}
          onClick={() => addSeriesToCart()}
        >
          {AreItemsInCart() ? (
            <h3>Added to cart!</h3>
          ) : (
            <h3>Add Series to Cart</h3>
          )}
        </button>
      </div>
    </section>
  );
}
