import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsDto } from './create-posts.dto';

export class UpdatePostsDto extends PartialType(CreatePostsDto) {}
