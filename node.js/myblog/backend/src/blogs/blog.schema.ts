import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from 'src/authors/schemas/author.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop({ type: String })
  image?: string;

  @Prop({ required: true, default: Date.now })
  creationDate: Date;

  @Prop({ type: Date })
  lastEditionDate?: Date;

  @Prop({ type: Boolean, required: true })
  published: boolean;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  visits: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
