import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: '1', description: 'Category ID' })
  @IsNumber()
  readonly category_id: number;

  @ApiProperty({ example: '1', description: 'Author ID' })
  @IsNumber()
  readonly author_id: number;

  @ApiProperty({ example: 'File system', description: 'Article title' })
  @IsString()
  @IsNotEmpty()
  readonly article_title: string;

  @ApiProperty({ example: 'Lorem impsum set ...', description: 'Article text' })
  @IsString()
  @IsNotEmpty()
  readonly article_text: string;
}
