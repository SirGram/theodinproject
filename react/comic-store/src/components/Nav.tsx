import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

export default function Nav({
  numberCartItems,
  onOpenCart,
}: {
  numberCartItems: number;
  onOpenCart: () => void;
}) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`z-10 bg-white w-full flex h-14 py-1 px-10 shadow justify-between transition-all duration-500 ${!visible ? 'fixed -top-20' : 'fixed top-0'}`}>
      <div className="flex items-center">
        <Link to="/">
          <img className="max-h-10" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/store">
          <h4 className="hover:opacity-50 transition-opacity">STORE</h4>
        </Link>
        <Link to="/account">
          <h4 className="hover:opacity-50 transition-opacity">ACCOUNT</h4>
        </Link>
        <Link to="/">
          <h4 className="hover:opacity-50 transition-opacity">HOME</h4>
        </Link>
        <button onClick={onOpenCart} className="hover:opacity-50 transition-opacity">
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
