import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({})
  avatarImage?: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
