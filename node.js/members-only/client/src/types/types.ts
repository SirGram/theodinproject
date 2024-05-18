import { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registrationDate: Date;
    avatar:string;
    signature?:string
    isPro: boolean
  }
  export interface IMessage{
    _id?: Types.ObjectId;
    content: string;
    timestamp: Date;
    sender: IUser;
  }