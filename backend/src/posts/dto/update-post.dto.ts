import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNumber()
    likes?: number;
}
