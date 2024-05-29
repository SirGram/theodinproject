import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: any): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save(); 
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async update(id: string, updateBlogDto: any): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndRemove(id).exec();
  }
}
