import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

export default function Nav({
  numberCartItems,
  onOpenCart,
  onOpenWishList,
}: {
  numberCartItems: number;
  onOpenCart: () => void;
  onOpenWishList: () => void;
}) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const isOnStoreRoute = location.pathname.includes("/store");
  const isOnAccountRoute = location.pathname.includes("/account");
  const isOnHomeRoute = location.pathname.includes("/account");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`z-10 bg-white w-full flex h-14 py-1 px-10 shadow justify-between transition-all duration-500 ${
        !visible ? "fixed -top-20" : "fixed top-0"
      }`}
    >
      <div className="flex items-center">
        <Link to="/">
          <img className="max-h-10 hover:scale-105 transition-all" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="flex gap-6 items-center pt-1">
      <Link to="/store" className={`${isOnStoreRoute ? "pointer-events-none" : ""}`}>
        <h4
          className={`hover:opacity-50 transition-opacity border-b-4 ${
            isOnStoreRoute ? "border-black pointer-events-none" : "border-white"
          }`}
        >
          STORE
        </h4>
      </Link>
      <Link to="/account" className={`${isOnAccountRoute ? "pointer-events-none" : ""}`}>
        <h4
          className={`hover:opacity-50 transition-opacity border-b-4 ${
            isOnAccountRoute ? "border-black pointer-events-none" : "border-white"
          }`}
        >
          ACCOUNT
        </h4>
      </Link>
        <button
          onClick={onOpenWishList}
          className="hover:opacity-50 transition-opacity"
        >
          <h4 className="hover:opacity-50 transition-opacity text-2xl"><FaHeart/></h4>
        </button>
       
        <button
          onClick={onOpenCart}
          className="hover:opacity-50 transition-opacity"
        >
          <h4 className="relative text-2xl">
            <FaShoppingCart />
            <span className="text-sm absolute top-0 right-0 -mt-3 -mr-4 h-5 w-5 flex items-center justify-center rounded-full bg-red-700 text-white">
              {numberCartItems}
            </span>
          </h4>
        </button>
      </div>
    </nav>
  );
}
