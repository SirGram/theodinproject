import { ComicFormat } from "./types";

export default interface Comic {
  id: number;
  title: string;
  format: ComicFormat;
  creators: string[];
  price: number;
  description?: string;
  description2?: string;
  issueNumber?: number;
  series?: { seriesName: string; seriesURI: string };
  images: { path: string; extension: string }[];
 
  pageCount?: number;
}
