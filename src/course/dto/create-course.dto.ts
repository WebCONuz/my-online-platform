import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'React.js Professional kurs',
    description: 'Course name',
  })
  @IsString()
  @IsNotEmpty()
  readonly course_name: string;

  @ApiProperty({ example: '1', description: 'Author ID' })
  @IsNumber()
  readonly author_id: number;

  @ApiProperty({ example: '3', description: 'Category ID' })
  @IsNumber()
  readonly category_id: number;

  @ApiProperty({ example: 'Lorem ipsum set ...', description: 'Course info' })
  @IsString()
  @IsOptional()
  readonly info: string;
}
