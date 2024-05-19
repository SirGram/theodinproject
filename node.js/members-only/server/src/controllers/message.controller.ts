import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IMessage, IUser } from '../types/interfaces';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

export const createMessage = async (req: Request, res: Response) => {
  const { content } = req.body;
  try {
    const newMessage: HydratedDocument<IMessage> = await Message.create({
      content,
      sender: req.user._id,
    });
    await newMessage.save();
    res.json({
      message: 'Message created succesfully',
      userMessage: newMessage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({}).populate<{ sender: IUser }>('sender', '-password');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).end();
  }
 
  try {
    const deletedMessage = await Message.findByIdAndDelete({
      _id: id,
    });
   
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({
      message: 'Message deleted succesfully',
      deletedMessage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
