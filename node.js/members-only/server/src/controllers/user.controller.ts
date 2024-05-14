import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { hash } from 'bcryptjs';
import { IUser } from '../types/interfaces';
import { User } from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  const {
    userName, firstName, lastName, email, password, registrationDate,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser: HydratedDocument<IUser> = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password,
      registrationDate,
    });
    const hashedPassword = await hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();

    res.json({ message: 'Registration successful!', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
