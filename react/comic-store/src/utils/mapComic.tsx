import Comic from "../interfaces/Comic";

export default function mapComic(comicData: any): Comic {
  return {
    id: comicData.id,
    title: comicData.title.trim(),
    creators: comicData.creators.items
      ? comicData.creators.items.map(
          (creator: { name: string }) => creator.name
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
    images: comicData.images
      ? comicData.images.map((image: any) => ({
          path: image.path,
          extension: image.extension,
        }))
      : [],
    pageCount:
      comicData.pageCount !== undefined ? comicData.pageCount : undefined,
    price: comicData.prices ? comicData.prices[0].price.toFixed(2) : 0.0,
    format: comicData.format ? comicData.format : undefined,
  };
}
