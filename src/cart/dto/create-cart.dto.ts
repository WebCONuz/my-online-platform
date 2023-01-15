import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '1', description: 'Statud ID' })
  @IsNumber()
  readonly status_id: number;

  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: '1', description: 'Course ID' })
  @IsNumber()
  readonly course_id: number;
}
