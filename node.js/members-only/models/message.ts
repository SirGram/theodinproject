import {
  model, models, Schema, Document,
} from 'mongoose';

import { User } from './user';

interface Message extends Document {
  _id?: string;
  content: string;
  timestamp: Date;
  sender: User;
}

const MessageSchema = new Schema<Message>({
  content: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Message = model<Message>('Message', MessageSchema);
