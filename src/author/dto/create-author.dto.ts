import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Farxod', description: 'Author first name' })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Jamolov', description: 'Author last name' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Author email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Author password' })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ example: '+998995441212', description: 'Author phone number' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ example: 'Lorem impsum ...', description: 'Author Info' })
  @IsString()
  @IsOptional()
  readonly info: string;

  @ApiProperty({
    example: 'true',
    description: 'Author is_active',
  })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
