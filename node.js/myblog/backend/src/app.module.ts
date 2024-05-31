import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    MongooseModule.forRoot(process.env.MONGO_URI),
    BlogsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
