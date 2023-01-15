import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateDto {
  @ApiProperty({ example: '1', description: 'id' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'true', description: 'activate value' })
  @IsNotEmpty()
  @IsBoolean()
  readonly value: boolean;
}
