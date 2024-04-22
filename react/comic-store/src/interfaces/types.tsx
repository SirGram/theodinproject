export type ComicDate = "thisWeek" | "lastWeek" | "thisMonth" | "nextWeek";
export type ComicLimit = 10 | 20 | 50 | 100;
export type ComicFormat =
  | "all"
  | "comic"
  | "magazine"
  | "trade paperback"
  | "hardcover"
  | "digest"
  | "graphical novel"
  | "digital comic"
  | "infinite comic";

  export enum ComicOrderBy {
    FocDate = "focDate",
    OnSaleDate = "onsaleDate",
    Title = "title",
    IssueNumber = "issueNumber",
    Modified = "modified",
    DescFocDate = "-focDate",
    DescOnSaleDate = "-onsaleDate",
    DescTitle = "-title",
    DescIssueNumber = "-issueNumber",
    DescModified = "-modified",
  }
  
