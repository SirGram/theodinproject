import Comic from "../interfaces/Comic";
import CartComic from "../interfaces/CartComic";
export default function BuyItem({
  item,
  cartItems,
  updateCartItems,
}: {
  item: Comic | null;
  cartItems: CartComic[];
  updateCartItems: (item: Comic | null, quantity: number) => void;
}) {
  const quantity: number = 1
  const isItemInCart = ():boolean=>{
    return cartItems.some(cartItem => cartItem.comic.id === item?.id);
  }
  return (
    <section className=" bg-slate-100 w-80 p-5 mt-7 flex flex-col justify-between">
      <div className=" text-center">
        <h2>$ {item?.price}</h2>
      </div>     
      <button
        className=" bg-orange-700 font-semibold text-white px-10 py-5 rounded-sm mt-5 w-full transition-opacity hover:opacity-50"
        onClick={() => updateCartItems(item, quantity)}
      >
        {isItemInCart()? (<h3>
        Added to cart!</h3>):(
        <h3>
        Add to Cart</h3>)}
      </button>
    </section>
  );
}
