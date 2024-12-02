import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comment.service";

@Controller('comments')
export class CommentsController {  
    constructor(private readonly commentsService: CommentsService) {}

    @Post(':postId')
    async createComment(
        @Param('postId') postId: number,
        @Body('content') content: string,
        @Body('parentId') parentId? :number,
       // @Body('author') author: string
       ){
        return this.commentsService.create(postId, content, parentId);
        }

    @Get(':postId')
    async getComments(
        @Param('postId') postId: number,
        ){
            return this.commentsService.getComments (postId);
            }
    @Delete(':commentId')
    async deleteComment(
        @Param('commentId') commentId: number,
        ){
            return this.commentsService.deleteComment(commentId);
            }
            

}