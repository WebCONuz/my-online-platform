import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreatePostsDto {
  @ApiProperty({ example: 'Node.js', description: 'Post name' })
  @IsString()
  @IsNotEmpty()
  readonly post_name: string;

  @ApiProperty({ example: 'Lorem ipsum dolor ...', description: 'Post text' })
  @IsString()
  @IsNotEmpty()
  readonly post_text: string;

  @ApiProperty({ example: '1', description: 'Post Author ID' })
  @IsNumber()
  readonly author_id: number;
}
