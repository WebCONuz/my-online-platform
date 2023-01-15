import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserAddressDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: 'Chilonzor', description: 'User address name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Uzbekistan', description: 'Country of user' })
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty({ example: '1', description: 'Region ID' })
  @IsNumber()
  readonly region_id: number;

  @ApiProperty({ example: '1', description: 'District ID' })
  @IsNumber()
  readonly district_id: number;

  @ApiProperty({ example: 'Gararin', description: 'Street name' })
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @ApiProperty({ example: '12-uy', description: 'House number' })
  @IsString()
  @IsNotEmpty()
  readonly house: string;

  @ApiProperty({ example: '6', description: 'Flat number' })
  @IsNumber()
  @IsOptional()
  readonly flat: number;

  @ApiProperty({ example: 'https://...', description: 'Google map location' })
  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty({ example: '100112', description: 'Post index' })
  @IsNumber()
  readonly post_index: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor set ...',
    description: 'Info about user',
  })
  @IsString()
  @IsOptional()
  readonly info: string;
}
