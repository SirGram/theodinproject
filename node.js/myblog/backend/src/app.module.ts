import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [BlogsModule, MongooseModule.forRoot("url")],
})
export class AppModule {}
