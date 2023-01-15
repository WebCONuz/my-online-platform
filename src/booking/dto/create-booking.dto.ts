import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '1', description: 'Cart ID' })
  @IsNumber()
  readonly cart_id: number;

  @ApiProperty({
    example: '2023-01-10T09:51:57.037Z',
    description: 'Booking finished time',
  })
  @IsString()
  @IsNotEmpty()
  readonly finishedAt: Date;

  @ApiProperty({ example: '1', description: 'Payment Method ID' })
  @IsNumber()
  readonly payment_method_id: number;

  @ApiProperty({ example: '1', description: 'Discount Coupon ID' })
  @IsNumber()
  @IsOptional()
  readonly discount_coupon_id: number;

  @ApiProperty({ example: '1', description: 'Status ID' })
  @IsNumber()
  readonly status_id: number;
}
