import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Farxod', description: 'Admin first name' })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Jamolov', description: 'Admin last name' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Admin email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Admin password' })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    example: 'https://t.me/admin1',
    description: 'Admin telegram link',
  })
  @IsString()
  @IsNotEmpty()
  readonly tg_admin_id: string;

  @ApiProperty({
    example: 'true',
    description: 'Admin is_active',
  })
  @IsBoolean()
  @IsOptional()
  readonly is_active: boolean;
}
