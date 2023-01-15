import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Admin email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Admin password' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
