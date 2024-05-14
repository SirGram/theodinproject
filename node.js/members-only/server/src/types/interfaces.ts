import { ObjectId } from "mongodb";

export interface IUser {
    _id?: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registrationDate: Date;
  }
  export interface IMessage extends Document {
    _id?: string;
    content: string;
    timestamp: Date;
    sender: ObjectId;
  }