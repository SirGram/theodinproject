import Comic from "../interfaces/Comic";
import mapComic from "./mapComic";

export default async function fetchItemData(
  comicId: number 
): Promise<Comic | null> {
  const publicKey: string = process.env.PUBLIC_KEY || "";
  const hash: string = process.env.HASH_KEY || "";
  const ts: string = "1"; 

  if (!publicKey || !hash) {
    console.error("Missing environment variables for authentication");
    return null;
  }

  try {
    let url = `http://gateway.marvel.com/v1/public/comics/${comicId}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    console.log(data);
    const comics: Comic[] = data.data.results.map(mapComic);

    return comics[0]
  } catch (error) {
    console.error("Error fetching comic data:", error);
    return null;
  }
}
