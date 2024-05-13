import {
  model, models, Schema, Document,
} from 'mongoose';

import { User } from './user';

interface IMessage extends Document {
  _id?: string;
  content: string;
  timestamp: Date;
  sender: typeof User;
}

const MessageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Message = model<IMessage>('Message', MessageSchema);
