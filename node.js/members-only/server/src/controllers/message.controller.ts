import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IMessage, IUser } from '../types/interfaces';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

export const createMessage = async (req: Request, res: Response) => {
  const { content, timestamp, sender } = req.body;
  try {
    const newMessage: HydratedDocument<IMessage> = await Message.create({
      content,
      timestamp,
      sender,
    });
    await newMessage.save()
    res.json({message: "Message created succesfully", userMessage:newMessage})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({}); 
        res.json(messages);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
};
