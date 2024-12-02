import { Module, } from "@nestjs/common";
import { CommentsController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "./comment.service";
import { Comment } from "./comment.entity";
import { PostsService } from "src/posts/posts.service";
import { Post } from "src/posts/entities/post.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Comment,Post]),],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
