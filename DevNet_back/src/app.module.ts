import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot(), // to load the env variables
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      entities:[Post,User],
      synchronize:true,
    }),
    TypeOrmModule.forFeature([User, Post]),
    PostsModule, // Include your posts module
    AuthModule,  // Include your auth module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
