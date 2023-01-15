import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'Credit cart', description: 'PaymentMethod name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
