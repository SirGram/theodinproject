import Comic from "../interfaces/Comic";
import mapComic from "./mapComic";
import {
  ComicFormat,
  ComicDate,
  ComicLimit,
  ComicOrderBy,
} from "../interfaces/types";

export default async function fetchComics(
  series: string | undefined = undefined,
  format: ComicFormat | undefined = "all",
  date: ComicDate | undefined = undefined,
  offset: number = 0,
  limit: ComicLimit | undefined = undefined,
  titleStartsWith: string = "ALL",
  searchTitle: string = "",
  orderBy: ComicOrderBy| undefined, startYear: string
): Promise<[Comic[], number]> {
  const publicKey: string = process.env.PUBLIC_KEY || "";
  const hash: string = process.env.HASH_KEY || "";
  const ts: string = "1";

 

  if (!publicKey || !hash) {
    console.error("Missing environment variables for authentication");
    return [[], 0];
  }

  try {
    let url = `http://gateway.marvel.com/v1/public/comics?&ts=${ts}&apikey=${publicKey}&hash=${hash}&formatType=comic&noVariants=true`;

    if (limit !== undefined) {
      console.log(offset);
      url = url += `&limit=${limit}`;
    }
    if (date !== undefined) {
      console.log(date);
      url += `&dateDescriptor=${date}`;
    }
    if (series !== undefined) {
      url += `&series=${series}`;
    }
    if (format !== "all" && format !== undefined) {
      url = url += `&format=${format}`;
    }
    if (offset !== 0 && format !== undefined) {
      console.log(offset);
      url = url += `&offset=${offset}`;
    }
    if (
      titleStartsWith.toLowerCase() !== "all" &&
      titleStartsWith !== undefined
    ) {
      console.log(titleStartsWith);
      url = url += `&titleStartsWith=${titleStartsWith}`;
    }
    if (searchTitle !== "") {
      url = url += `&title=${searchTitle}`;
    }
    if (orderBy !== undefined) {
      url = url += `&orderBy=${orderBy}`;
    }
    if (startYear !== 'unset') {
      url = url += `&startYear=${startYear}`;
    }
    console.log(startYear);

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    console.log(data);
    const comics: Comic[] = data.data.results.map(mapComic);
    const totalComics: number = data.data.total;

    return [comics, totalComics];
  } catch (error) {
    console.error("Error fetching comic data:", error);
    return [[], 0];
  }
}
