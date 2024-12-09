import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
@IsString()
content: string;

@IsOptional()
@IsNumber()
likes?: number;
}
