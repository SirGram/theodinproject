import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsService } from './blogs/blogs.service';
import { BlogsModule } from './blogs/blogs.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BlogsModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, BlogsController],
  providers: [AppService, BlogsService],
})
export class AppModule {}
