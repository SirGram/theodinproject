import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer.tsx";
import Nav from "./components/Nav.tsx";
import Offer from "./components/Offer.tsx";
import messages from "./data/Messages.tsx";
import fetchComicData from "./pages/fetchComicData.tsx";
import Home from "./pages/Home.tsx";
import Store from "./pages/Store.tsx";
import CardPage from "./pages/CardPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Comic from "./interfaces/Comic";
import CartComic from "./interfaces/CartComic.tsx";
import Cart from "./modal/Cart.tsx";
import Account from "./pages/Account.tsx";
import { ComicFormat, ComicDate, ComicLimit } from "./interfaces/types";

function App() {
  const discountPercentage: number = 20;
  const shippingPrice: number = 4.99;
  const freeShippingLimit: number = 30;

  const [featuredItems, setFeaturedItems] = useState<Comic[] | []>([]);
  const [items, setItems] = useState<Comic[] | []>([]);
  const [currentItem, setCurrentItem] = useState<Comic | null>(null);
  const [numberTotalItems, setNumberTotalItems] = useState<number>(0);

  const [page, setPage] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartComic[] | []>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const toggleCart = () => {
    const invertIsCartOpen = !isCartOpen;
    if (invertIsCartOpen) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");

    setIsCartOpen(invertIsCartOpen);
  };
  const removeCartItem = (item: CartComic) => {
    const existingCartItemIndex: number = cartItems.findIndex(
      (cartItem) => cartItem.comic.id === item.comic.id
    );
    if (existingCartItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(existingCartItemIndex, 1);
      setCartItems(newCartItems);
    }
  };
  const removeAllCartItems = ():void=>{
    setCartItems([]);
  }
  const updateCartItems = (items: Comic[], quantity: number) => {
    
    if (items.length > 0) {
      
      const newCartItems: CartComic[] = [...cartItems];
      items.forEach((item) => {
        console.log(item)
        const existingCartItemIndex: number = newCartItems.findIndex(
          (cartItem) => cartItem.comic.id === item.id
        );
        console.log(existingCartItemIndex)
        if (existingCartItemIndex === -1) {
          newCartItems.push({ comic: item, quantity: quantity });
         
        }else{
          newCartItems[existingCartItemIndex] = { comic: item, quantity: quantity }
        }
      });
      setCartItems(newCartItems);
      console.log(newCartItems);
    }
  };

  const [displayMode, setDisplayMode] = useState<boolean>(true);
  const updateDisplayMode = (value: boolean): void => {
    setDisplayMode(value);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const formats: ComicFormat[] = [
    "all",
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
  const [ searchTitle,setSearchTitle] = useState<string>('');

  const itemLimitArray: number[] = [10, 20, 50, 100];
  const [itemLimit, setItemLimit] = useState<ComicLimit>(itemLimitArray[1]);
  const [titleStartsWith, setTitleStartsWith] = useState<string>("all");

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
      const offset = page * itemLimit;
      console.log(offset);
      const [comics, numberComics]: [Comic[], number] = await fetchComicData(
        undefined,
        format,
        undefined,
        offset,
        itemLimit,
        titleStartsWith,searchTitle
      );
      console.log(comics);
      setFeaturedItems(comics.slice(0, 4));
      setItems(comics);
      setIsLoading(false);
      setNumberTotalItems(numberComics);
    })();
  }, [page, format, itemLimit, titleStartsWith, searchTitle]);

  return (
    <div id="app" className="flex flex-col  text-black ">
      <header className="mb-14">
        {/* <Offer messages={messages} duration={duration} /> */}
        <Nav numberCartItems={numberCartItems} onOpenCart={toggleCart} />
      </header>
      <main className="flex flex-1 flex-col">
      <Offer freeShippingLimit={freeShippingLimit}></Offer>
        <Cart
          isCartOpen={isCartOpen}
          onCartClose={toggleCart}
          cartItems={cartItems}
          numberCartItems={numberCartItems}
          updateCartItems={updateCartItems}
          removeCartItem={removeCartItem}
          shippingPrice={shippingPrice}
          freeShippingLimit={freeShippingLimit}
          discountPercentage={discountPercentage}
          removeAllCartItems={removeAllCartItems}
        />
        <Routes>
          <Route
            path="/"
            element={<Home items={featuredItems} isLoading={isLoading} />}
          />
          <Route path="/account" element={<Account />} />
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
                searchTitle= {searchTitle}
                setSearchTitle={setSearchTitle}
                formats={formats}
                displayMode={displayMode}
                updateDisplayMode={updateDisplayMode}
                itemLimit={itemLimit}
                setItemLimit={setItemLimit}
                itemLimitArray={itemLimitArray}
                titleStartsWith={titleStartsWith}
                setTitleStartsWith={setTitleStartsWith}
                discountPercentage={discountPercentage}
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
                discountPercentage={discountPercentage}
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
