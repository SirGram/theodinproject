import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Blog } from './blog.schema';
import { UserSettings } from './userSettings.schema';

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] })
  blogs: Blog[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' } })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
