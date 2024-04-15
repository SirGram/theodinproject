import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Offer from "./components/Offer.tsx";
import messages from "./data/Messages.tsx";
import fetchComicData from "./utils/fetchComicData.tsx";
import Home from "./pages/Home.tsx";
import Store from "./pages/Store.tsx";
import Comic from "./interfaces/Comic";
import CardPage from "./pages/CardPage.tsx";
import Loading from "./pages/Loading.tsx";

function App() {
  const [featuredItems, setFeaturedItems] = useState<Comic[] | []>([]);
  const [items, setItems] = useState<Comic[] | []>([]);
  const [currentItem, setCurrentItem] = useState<Comic | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage: number = 10;
  const duration: number = 20;
  useEffect(() => {
    (async () => {
      const formatDescription = (description: string): string => {
        return description.replace(/<br\s*\/?>/gi, " ");
      };
      const mapComic = (comicData: any): Comic => ({
        id: comicData.id,
        title: comicData.title,
        creators: comicData.creators.items
          ? comicData.creators.items.map(
              (creator: { name: string }) => creator.name
            )
          : [],
        description2: comicData.description ? comicData.description : undefined,
        description: comicData.textObjects[0]
          ? formatDescription(comicData.textObjects[0].text)
          : undefined,
        issueNumber:
          comicData.issueNumber !== undefined
            ? comicData.issueNumber
            : undefined,
        seriesName: comicData.series ? comicData.series.name : undefined,
        thumbnail: comicData.thumbnail
          ? {
              path: comicData.thumbnail.path,
              extension: comicData.thumbnail.extension,
            }
          : undefined,
        pageCount:
          comicData.pageCount !== undefined ? comicData.pageCount : undefined,
        price: comicData.prices ? comicData.prices[0].price : 0,
      });
      const data = await fetchComicData();
      console.log(data);
      const comics: Comic[] = data.map(mapComic);
      console.log(comics);

      setFeaturedItems(comics.slice(0, 4));
      setItems(comics);
     setIsLoading(false) 
    })();
  }, []);

  return (
    <div id="app" className="flex flex-col  text-black ">
      <Offer messages={messages} duration={duration} />
      <Header />
      <main className="flex flex-1 flex-col">
        
        <Routes>
          <Route path="/" element={<Home items={featuredItems} isLoading = {isLoading}/>} />
          <Route
            path="/store"
            element={<Store items={items} numberItems={itemsPerPage} isLoading = {isLoading}/>}
          />
          <Route
            path="/store/:itemId"
            element={
              <CardPage
                items={items}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
