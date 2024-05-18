import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { hash } from 'bcryptjs';
import { IUser } from '../types/interfaces';
import { User } from '../models/user.model';
import { AvatarGenerator } from 'random-avatar-generator';

export const registerUser = async (req: Request, res: Response) => {
  const {
    userName, firstName, lastName, email, password, registrationDate,
  } = req.body;
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) return res.status(400).json({ message: 'User  already exists' });
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'Email  already exists' });

    const newUser: HydratedDocument<IUser> = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password,
      registrationDate,
      avatar,
    });
    

    return res.status(200).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
