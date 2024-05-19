import { User } from "../models/user.model";
import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import * as bcrypt from "bcryptjs";
import dotenv from 'dotenv'

dotenv.config()

const jwtKey = process.env.JWT_KEY!; 

export const signIn = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
        const user = await User.findOne({ email:email.toLowerCase() });
        if (!user) {
          return res.status(400).json({ msg: "Email doesn't exist" });
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid password' });
        }
    
        const payload = {
          user: {
            _id: user._id.toString(),
          },
        };
    
        const token = jwt.sign(
          payload,
          jwtKey,
          {
            expiresIn: "1d",
          }
        );
    
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Login success",
          token: token,
          user: {
            _id: user.id,
            username: user.userName,
            email: user.email,
            avatar:user.avatar
          }
        });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  };

}


