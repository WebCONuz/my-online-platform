import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ example: 'Zomin', description: 'District name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
