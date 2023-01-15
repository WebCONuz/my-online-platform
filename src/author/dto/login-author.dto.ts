import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthorDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Author email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Author password' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
