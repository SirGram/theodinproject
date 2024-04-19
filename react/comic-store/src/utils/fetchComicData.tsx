import Comic from "../interfaces/Comic";

import { ComicFormat, ComicDate, ComicLimit } from "../interfaces/types";


export default async function fetchComicData(
  series: string | undefined = undefined,
  format: ComicFormat  = "All",
  date: ComicDate | undefined = undefined,
  offset: number = 0,
  limit: ComicLimit | undefined = undefined,
  titleStartsWith:string
): Promise<[Comic[], number]> {
  const publicKey: string = process.env.PUBLIC_KEY || "";
  const hash: string = process.env.HASH_KEY || "";
  const ts: string = "1";

  const formatDescription = (description: string): string => {
    return description.replace(/<br\s*\/?>/gi, " ");
  };
  const mapComic = (comicData: any): Comic => ({
    id: comicData.id,
    title: comicData.title.trim(),
    creators: comicData.creators.items
      ? comicData.creators.items.map(
          (creator: { name: string }) => creator.name,
        )
      : [],
    description2: comicData.description ? comicData.description : undefined,
    description: comicData.textObjects[0]
      ? comicData.textObjects[0].text
      : undefined,
    issueNumber:
      comicData.issueNumber !== undefined ? comicData.issueNumber : undefined,
    series: comicData.series
      ? {
          seriesName: comicData.series.name,
          seriesURI: comicData.series.resourceURI,
        }
      : undefined,
    thumbnail: comicData.thumbnail
      ? {
          path: comicData.thumbnail.path,
          extension: comicData.thumbnail.extension,
        }
      : undefined,
    pageCount:
      comicData.pageCount !== undefined ? comicData.pageCount : undefined,
    price: comicData.prices ? comicData.prices[0].price.toFixed(2) : 0.0,
    format: comicData.format ? comicData.format : undefined,
  });

  if (!publicKey || !hash) {
    console.error("Missing environment variables for authentication");
    return [[], 0];
  }

  try {
    let url = `http://gateway.marvel.com/v1/public/comics?&ts=${ts}&apikey=${publicKey}&hash=${hash}&formatType=comic&noVariants=true&orderBy=title`;

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
    if (format !== "All") {
      url = url += `&format=${format}`;
    }
    if (offset !== 0) {
      console.log(offset);
      url = url += `&offset=${offset}`;
    }
    if (titleStartsWith!== "#") {
      console.log(titleStartsWith);
      url = url += `&titleStartsWith=${titleStartsWith}`;
    }
  
    console.log(url);

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`,
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
