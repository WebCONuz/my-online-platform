import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateExercisesDto {
  @ApiProperty({ example: '1', description: 'Author ID' })
  @IsNumber()
  @IsOptional()
  readonly author_id: number;

  @ApiProperty({ example: '1', description: 'category ID' })
  @IsNumber()
  readonly category_id: number;

  @ApiProperty({
    example: 'LeeteCode: https://...',
    description: 'Sourse of Exercise',
  })
  @IsString()
  @IsOptional()
  readonly source: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor set ... ?',
    description: 'Text of Exercise',
  })
  @IsString()
  @IsNotEmpty()
  readonly exercise_text: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor set ... ?',
    description: 'Answer of Exercise',
  })
  @IsString()
  @IsOptional()
  readonly answer_text: string;
}
