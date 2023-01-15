import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOpinionDto {
  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ example: 'Lorem ipsum dolor ...', description: 'Description' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ example: '5', description: 'star' })
  @IsNumber()
  @IsOptional()
  readonly star: number;

  @ApiProperty({
    example: 'course',
    description: 'For which table the file is used',
  })
  @IsString()
  @IsNotEmpty()
  readonly target_table_name: string;

  @ApiProperty({ example: '1', description: 'Table ID' })
  @IsNumber()
  readonly target_table_id: number;
}
