import CartComic from "../interfaces/CartComic";
import Comic from "../interfaces/Comic";
import CartCard from "../components/CartCard";
import { IoClose } from "react-icons/io5";

export default function Cart({
  isCartOpen,
  onCartClose,
  cartItems,
  numberCartItems,
  updateCartItems,
  removeCartItem,
  removeAllCartItems,
  shippingPrice,
  freeShippingLimit,
  discountPercentage,
}: {
  isCartOpen: boolean;
  onCartClose: () => void;
  cartItems: CartComic[];
  numberCartItems: number;
  updateCartItems: (items: Comic[], quantity: number) => void;
  removeCartItem: (item: CartComic) => void;
  removeAllCartItems: () => void;
  shippingPrice: number;
  freeShippingLimit: number;
  discountPercentage: number;
}) {
  const getSubTotalPrice = (): number => {
    let price = 0;
    cartItems.forEach((cartItem) => {
      price += cartItem.comic.price * cartItem.quantity;
    });
    return Number(price);
  };
  const getIsFreeShipping = (): boolean => {
    return subTotalPrice > freeShippingLimit;
  };

  const getDiscountedPrice = (): number => {
    const discount: number = Number((discountPercentage * subTotalPrice) / 100);
    return discount;
  };
  const getTotalPrice = (): number => {
    const total =
      subTotalPrice + (isFreeShipping ? 0 : shippingPrice) - discountedPrice;
    return Number(total);
  };
  const subTotalPrice: number = getSubTotalPrice();
  const isFreeShipping: boolean = getIsFreeShipping();
  const discountedPrice: number = getDiscountedPrice();
  const totalPrice: number = getTotalPrice();
  const barWidth: number = Math.min(
    (subTotalPrice / freeShippingLimit) * 100,
    100,
  );

  const remainingBarPrice: number = Math.max(
    freeShippingLimit - subTotalPrice,
    0,
  );

  return (
    <>
      {isCartOpen && (
        //modal overlay
        <div className=" fixed left-0 top-0 flex w-full h-full backdrop-brightness-35 z-10">
          <div className=" absolute flex  z-10 right-0 top-0 bg-white h-screen px-8 py-5 w-2/4 ">
            <button
              className="hover:opacity-50 bg-slate-50 text-5xl absolute left-0 top-0 flex items-center justify-center h-8 w-8 outline-slate-950 outline"
              onClick={onCartClose}
            >
              <IoClose />
            </button>
            <div className="flex flex-col justify-between w-full">
              {numberCartItems === 0 ? (
                <h2 className="mb-5 text-center">Cart is empty</h2>
              ) : (
                <>
                  <h2 className="mb-5 text-center">
                    {numberCartItems} {numberCartItems === 1 ? "item" : "items"}{" "}
                    in the cart
                  </h2>
                  <div className="w-full h-10 bg-slate-300 relative mb-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-black"
                      style={{
                        width: `${barWidth}%`,
                        zIndex: 2,
                        transition: "width 0.5s ease",
                      }}
                    ></div>
                    <span
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white"
                      style={{
                        zIndex: 3,
                        mixBlendMode: "difference",
                      }}
                    >
                      {remainingBarPrice > 0
                        ? `Spend $${remainingBarPrice.toFixed(
                            2,
                          )} more for free shipping`
                        : "You are eligible for free shipping"}
                    </span>
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-orange-700 "
                      style={{ zIndex: 4, mixBlendMode: "screen" }}
                    ></div>
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      className="hover:underline hover:opacity-50"
                      onClick={removeAllCartItems}
                    >
                      Remove All
                    </button>
                  </div>
                  <ul className="flex flex-col gap-6 overflow-y-scroll bg-slate-200 p-5 flex-1">
                    {cartItems.map((cartItem, index) => (
                      <li key={index} className=" bg-slate-100">
                        <CartCard
                          cartItem={cartItem}
                          updateCartItems={updateCartItems}
                          removeCartItem={removeCartItem}
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 ">
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <h4 className="font-thin">SubTotal:</h4>
                        <h4 className="font-thin text-right">
                          {" "}
                          ${subTotalPrice.toFixed(2)}
                        </h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="font-thin">Shipping:</h4>

                        <h4
                          className={`text-right font-thin ${
                            isFreeShipping ? "line-through" : ""
                          }`}
                        >
                          {" "}
                          ${shippingPrice.toFixed(2)}
                        </h4>
                      </div>
                      <div className="flex justify-between">
                        <h4 className="font-thin">Discount:</h4>
                        <h4 className="font-thin text-right">
                          {" "}
                          -${discountedPrice.toFixed(2)}
                        </h4>
                      </div>
                      <div className="flex justify-between mt-1">
                        <h3>Total:</h3>
                        <h3 className="text-right">
                          {" "}
                          ${totalPrice.toFixed(2)}
                        </h3>
                      </div>
                    </div>

                    <button
                      className="mt-5 w-full py-2 bg-orange-700 text-white hover:opacity-50 transition-opacity"
                      onClick={() =>
                        window.alert(
                          `You bought ${numberCartItems} item/s for $${totalPrice}!`,
                        )
                      }
                    >
                      <h3>Checkout</h3>
                    </button>
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
