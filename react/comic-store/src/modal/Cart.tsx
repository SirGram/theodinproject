import CartComic from "../interfaces/CartComic";
import Comic from "../interfaces/Comic";
import CartCard from "../components/CartCard";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function Cart({
  isCartOpen,
  onCartClose,
  cartItems,
  numberCartItems,updateCartItems, removeCartItem
}: {
  isCartOpen: boolean;
  onCartClose: () => void;
  cartItems: CartComic[];
  numberCartItems: number;
  updateCartItems:(items:Comic[] | [], quantity:number)=>void
  removeCartItem:(item:CartComic)=>void
}) {
  const getTotalPrice = (): string => {
    let price = 0;
    cartItems.forEach((cartItem) => {
      price += cartItem.comic.price * cartItem.quantity;
    });
    return price.toFixed(2);
  };
  const [totalPrice, setTotalPrice] = useState<string>(getTotalPrice());
  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cartItems]);

  return (
    <>
      {isCartOpen && (
        //modal overlay
        <div className=" fixed left-0 top-0 flex w-full h-full backdrop-blur-sm z-10">
          <div className=" absolute flex  z-10 right-0 top-0 bg-white h-screen px-8 py-5 w-2/4 ">
            <button
              className="hover:opacity-50 bg-slate-50 text-xl absolute left-0 top-0 flex items-center justify-center h-8 w-8 outline-slate-950 outline"
              onClick={onCartClose}
            >
              <IoClose />
            </button>
            <div className="flex flex-col justify-between w-full">
              {numberCartItems === 0 ? (
                <h2 className="mb-5 text-center">Cart is empty</h2>
              ) : (
                <h2 className="mb-5 text-center">
                  {numberCartItems} {numberCartItems === 1 ? "item" : "items"}{" "}
                  in the cart
                </h2>
              )}
              <ul className="flex flex-col gap-6 overflow-y-scroll bg-slate-200 p-5 flex-1">
                {cartItems.map((cartItem, index) => (
                  <li key={index} className=" bg-slate-100">
                    <CartCard cartItem={cartItem} updateCartItems={updateCartItems} removeCartItem={removeCartItem}/>
                  </li>
                ))}
              </ul>
           
            <div className="mt-5">
              <h3>Total: $ {totalPrice}</h3>
              <button className="mt-5 w-full py-2 bg-orange-700 text-white hover:opacity-50 transition-opacity"
                onClick={()=>window.alert(`You bought ${numberCartItems} item/s for $ ${totalPrice}!`)}>

                <h3>Checkout</h3>
              </button>
            </div> </div>
          </div>
        </div>
      )}
    </>
  );
}
