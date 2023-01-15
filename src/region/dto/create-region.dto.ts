import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'Tashkent', description: 'Region name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
