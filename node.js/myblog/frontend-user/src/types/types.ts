import { Types } from "mongoose";

export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  registrationDate: string;
  settings?: {
    about?: string;
    avatarImage?: string;
  };
}
export interface IComment {
  content?: string;
  user?: string;
  creationDate?: string;
}
export interface IBlogEntry {
  _id: string;
  title: string;
  content: string;
  image?: string;
  user: IUser;
  creationDate: string;
  published: boolean;
  likes: number;
  visits: number;
  comments: IComment[];
}
