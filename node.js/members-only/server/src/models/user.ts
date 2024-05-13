import {
  model, models, Schema, Document,
  ObjectId,
} from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  registrationDate: Date;
}

const UserSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
