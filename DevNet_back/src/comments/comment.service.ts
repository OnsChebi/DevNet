import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  
  async create(postId: number, content: string, parentId?: number): Promise<Comment> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error('Post not found');
    }

    const parent = parentId ? await this.commentsRepository.findOne({ where: { id: parentId } }) : null;

    const comment = this.commentsRepository.create({
      content,
      post,
      parent,
    });

    return this.commentsRepository.save(comment);
  }

  async getComments(postId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { post: { id: postId }, parent: null },
      relations: ['children'],
    });
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.commentsRepository.delete(commentId);
  }
}
