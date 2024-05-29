import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from 'src/authors/schemas/author.schema';
import { Blog } from 'src/blogs/blog.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  author: Author;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true })
  blog: Blog;

  @Prop({ type: Date, default: Date.now })
  creationDate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
