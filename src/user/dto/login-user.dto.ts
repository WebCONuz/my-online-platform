import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
