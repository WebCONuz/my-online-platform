import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'frontend', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  readonly category_name: string;

  @ApiProperty({ example: '1', description: 'Parent Category ID' })
  @IsNumber()
  @IsOptional()
  readonly parent_category_id: number;
}
