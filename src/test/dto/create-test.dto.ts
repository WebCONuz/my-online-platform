import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({ example: '1', description: 'Category ID' })
  @IsNumber()
  readonly category_id: number;

  @ApiProperty({
    example: "Hooklar necha turga bo'linadi?",
    description: 'Test queston',
  })
  @IsString()
  @IsNotEmpty()
  readonly question: string;
}
