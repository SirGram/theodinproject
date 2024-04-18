import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer.tsx";
import Nav from "./components/Nav.tsx";
import Offer from "./components/Offer.tsx";
import messages from "./data/Messages.tsx";
import fetchComicData from "./utils/fetchComicData.tsx";
import Home from "./pages/Home.tsx";
import Store from "./pages/Store.tsx";
import CardPage from "./pages/CardPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Comic from "./interfaces/Comic";
import CartComic from "./interfaces/CartComic.tsx";
import { ComicFormat } from "./interfaces/ComicFormat.tsx";
import Cart from "./modal/Cart.tsx";
import Account from "./pages/Account.tsx";

function App() {
  const [featuredItems, setFeaturedItems] = useState<Comic[] | []>([]);
  const [items, setItems] = useState<Comic[] | []>([]);
  const [currentItem, setCurrentItem] = useState<Comic | null>(null);
  const [numberTotalItems, setNumberTotalItems] = useState<number>(0);

  const [page, setPage] = useState<number>(0);

  const [cartItems, setCartItems] = useState<CartComic[] | []>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const removeCartItem = (item:CartComic)=>{
    const existingCartItemIndex: number = cartItems.findIndex(
      (cartItem) => cartItem.comic.id === item.comic.id
    );
    if (existingCartItemIndex !== -1) {
      const newCartItems = [...cartItems]
      newCartItems.splice(existingCartItemIndex,1)
      setCartItems(newCartItems)
    }
  }
  const updateCartItems = (item: Comic | null, quantity: number) => {
    console.log('function', item, quantity)
    if (item !== null) {
      console.log("asdf");
      const existingCartItemIndex: number = cartItems.findIndex(
        (cartItem) => cartItem.comic.id === item.id
      );
      if (existingCartItemIndex !== -1) {
        const newCartItems = cartItems.map((cartItem, index) =>
          index === existingCartItemIndex
            ? { ...cartItem, quantity: quantity }
            : cartItem
        );
        setCartItems(newCartItems);
      } else {
        setCartItems([...cartItems, { comic: item, quantity: quantity }]);
      }
    }
    console.log(cartItems);
  };

  const [displayMode, setDisplayMode] = useState<boolean>(true);
  const updateDisplayMode = (value: boolean): void => {
    setDisplayMode(value);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const duration: number = 20;
  const formats: ComicFormat[] = [
    "comic",
    "magazine",
    "trade paperback",
    "hardcover",
    "digest",
    "graphical novel",
    "digital comic",
    "infinite comic",
  ];
  const [format, setFormat] = useState<ComicFormat>(formats[0]);

  const getNumberCartItems = (): number => {
    let number = 0;
    cartItems.forEach((cartItem) => {
      number += cartItem.quantity;
    });
    return number;
  };
  const [numberCartItems, setNumberCartItems] = useState<number>(
    getNumberCartItems()
  );
  useEffect(() => {
    setNumberCartItems(getNumberCartItems());
  }, [cartItems]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const offset = page * 100;
      console.log(offset);
      const [comics, numberComics]: [Comic[], number] = await fetchComicData(
        undefined,
        format,
        undefined,
        offset
      );
      console.log(comics);
      setFeaturedItems(comics.slice(0, 4));
      setItems(comics);
      setIsLoading(false);
      setNumberTotalItems(numberComics);
    })();
  }, [page, format]);

  return (
    <div id="app" className="flex flex-col  text-black ">
      <header className="mb-14">
        {/* <Offer messages={messages} duration={duration} /> */}
        <Nav numberCartItems={numberCartItems} onOpenCart={toggleCart} />
      </header>
      <main className="flex flex-1 flex-col">
        <Cart
          isCartOpen={isCartOpen}
          onCartClose={toggleCart}
          cartItems={cartItems}
          numberCartItems={numberCartItems}
          updateCartItems={updateCartItems}
          removeCartItem={removeCartItem}
        />
        <Routes>
          <Route
            path="/"
            element={<Home items={featuredItems} isLoading={isLoading} />}
          />
          <Route
            path="/account"
            element={<Account />}
          />
          <Route
            path="/store"
            element={
              <Store
                items={items}
                isLoading={isLoading}
                totalItems={numberTotalItems}
                page={page}
                setPage={setPage}
                format={format}
                setFormat={setFormat}
                formats={formats}
                displayMode = {displayMode}
                updateDisplayMode = {updateDisplayMode}
              />
            }
          />
          <Route
            path="/store/:index"
            element={
              <CardPage
                items={items}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                isLoading={isLoading}
                cartItems={cartItems}
                updateCartItems={updateCartItems}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
