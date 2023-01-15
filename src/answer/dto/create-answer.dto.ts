import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: '1', description: 'Test ID' })
  @IsNumber()
  readonly test_id: number;

  @ApiProperty({
    example: '2 ta',
    description: 'Answer text',
  })
  @IsString()
  @IsNotEmpty()
  readonly answer_text: string;

  @ApiProperty({
    example: 'true',
    description: 'Answer is_true',
  })
  @IsBoolean()
  @IsOptional()
  readonly is_true: boolean;
}
