export default interface Comic{
    id: number;
    title: string;
    creators: string[];
    price: number;
    description?: string;
    description2?: string;
    issueNumber?: number;
    seriesName?: string; 
    thumbnail?: {
        path: string;
        extension: string;
    }
    pageCount?: number;

}