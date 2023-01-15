import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: '1', description: 'Category ID' })
  @IsNumber()
  readonly category_id: number;

  @ApiProperty({ example: 'File system', description: 'News title' })
  @IsString()
  @IsNotEmpty()
  readonly news_title: string;

  @ApiProperty({ example: 'Lorem impsum set ...', description: 'News text' })
  @IsString()
  @IsNotEmpty()
  readonly news_text: string;
}
