import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private PostsRepository:Repository<Post>
  ){}

  async create(createPostDto: CreatePostDto) {
    const post=this.PostsRepository.create(createPostDto);
    return await this.PostsRepository.save(post);
    }

  async findAll() {
    return await this.PostsRepository.find();
  }

  async findOne(id:number) {
    return await this.PostsRepository.findOneBy({id});
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.PostsRepository.update(id,updatePostDto);
  }

  async remove(id: number) {
    return await this.PostsRepository.softDelete(id);
  }
}
