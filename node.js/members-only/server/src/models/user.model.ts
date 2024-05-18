import { model, models, Schema, Document, ObjectId, Model } from "mongoose";
import { IUser } from "../types/interfaces";
import * as bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  avatar: { type: String, required: false },
  signature: { type: String, required: false },
  isPro: { type: Boolean, default: false, required: true },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export const User = model<IUser>("User", UserSchema);
