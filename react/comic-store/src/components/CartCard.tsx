import { FaMinus, FaPlus } from "react-icons/fa";
import CartComic from "../interfaces/CartComic";
import CardImage from "./CardImage";
import Comic from "../interfaces/Comic";
import { MdDelete } from "react-icons/md";

export default function CartCard({
  cartItem,
  updateCartItems,removeCartItem
}: {
  cartItem: CartComic;
  updateCartItems: (items: Comic[] | [], quantity: number) => void;
  removeCartItem:(item:CartComic)=>void
}) {
  const substractQuantity = (): void => {
    if (cartItem.quantity > 1) {
      const newQuantity:number = cartItem.quantity - 1;
      updateCartItems([cartItem.comic], newQuantity);
    }
  };  const addQuantity = (): void => {

    if (cartItem.quantity < 99) {  
      const newQuantity:number = cartItem.quantity + 1;
      updateCartItems([cartItem.comic], newQuantity);
    }
  };
  return (
    <div className="flex w-full ">
      <div className=" h-32 w-20 shrink-0">
        <CardImage
          path={`${cartItem.comic.images[0]?.path}.${cartItem.comic.images[0]?.extension}`}
          title={cartItem.comic.title}
          height="full"
        />{" "}
      </div>
      <div className="flex flex-col justify-between px-5 py-2 flex-1">
        <div>
          <h6 className="mb-2 h-10 overflow-hidden overflow-ellipsis line-clamp-2">
            {cartItem.comic.title}
          </h6>
          <span className="text-lg">$ {cartItem.comic.price}</span>
        </div>
        <div className="flex items-center justify-start">
          
          <div className="flex w-full justify-start h-8 ">
            <button
              onClick={() => substractQuantity()}
              className=" w-8 p-1  bg-slate-200 text-xl flex items-center justify-center hover:opacity-50 transition-opacity"
            >
              <FaMinus />
            </button>

            <h4 className="w-10 text-center bg-white">{cartItem.quantity}</h4>
            <button
              onClick={() => addQuantity()}
              className=" w-8 p-1  bg-slate-200 text-xl flex items-center justify-center hover:opacity-50 transition-opacity"
            >
              <FaPlus />
            </button>
          </div>
          <button
          onClick={()=>removeCartItem(cartItem)}
          className="text-2xl hover:opacity-50 transition-opacity"><MdDelete /></button>
        </div>
      </div>
    </div>
  );
}
