import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

import dotenv from 'dotenv'

dotenv.config()

const jwtKey = process.env.JWT_KEY!; 
console.log(jwtKey)

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded:any = jwt.verify(token, jwtKey) ;
    console.log("decoded",decoded)
    const user = await User.findById(decoded.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
