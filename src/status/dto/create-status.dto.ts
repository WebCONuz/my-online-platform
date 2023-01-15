import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'pending', description: 'Status name' })
  @IsString()
  @IsNotEmpty()
  readonly status: string;
}
