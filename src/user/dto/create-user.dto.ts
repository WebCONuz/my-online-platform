import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Farxod', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty({ example: 'Jamolov', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ example: '+998995441212', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ example: 'male', description: 'User gender' })
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
}
