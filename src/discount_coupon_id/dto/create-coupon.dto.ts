import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({ example: 'ayollar', description: 'Coupon for who' })
  @IsString()
  @IsNotEmpty()
  readonly for_who: string;

  @ApiProperty({ example: '25', description: 'Coupon percentage' })
  @IsNumber()
  readonly percentage: number;
}
