import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateCreditCardDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: 'humo', description: 'Credit Card name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '8960 1200 1414 1212',
    description: 'Credit Card number',
  })
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @ApiProperty({ example: '2024', description: 'Credit Card Year' })
  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @ApiProperty({ example: '09', description: 'Credit Card month' })
  @IsString()
  @IsNotEmpty()
  readonly month: string;

  @ApiProperty({ example: 'true', description: 'Credit Card is active' })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty({ example: 'true', description: 'Credit Card is main' })
  @IsBoolean()
  @IsOptional()
  is_maine: boolean;
}
