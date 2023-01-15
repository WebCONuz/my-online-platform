import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ example: 'react', description: 'Media name' })
  @IsString()
  @IsNotEmpty()
  readonly media_name: string;

  @ApiProperty({
    example: 'course',
    description: 'For which table the file is used',
  })
  @IsString()
  @IsNotEmpty()
  readonly target_table_name: string;

  @ApiProperty({ example: '1', description: 'Table ID' })
  @IsString()
  @IsNotEmpty()
  readonly target_table_id: string;
}
