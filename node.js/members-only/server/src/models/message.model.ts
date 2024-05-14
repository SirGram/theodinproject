import {
  model, models, Schema, Document,
} from 'mongoose';

import { IMessage } from '../types/interfaces';

const MessageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Message = model<IMessage>('Message', MessageSchema);
