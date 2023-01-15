import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../../cart/entity/cart.entity';
import { Coupon } from '../../discount_coupon_id/entity/coupon.entity';
import { PaymentMethod } from '../../payment_method/entity/payment-method.entity';
import { Status } from '../../status/entity/status.entity';

interface BookingCreationAttr {
  cart_id: number;
  finishedAt: Date;
  payment_method_id: number;
  discount_coupon_id: number;
  status_id: number;
}

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking, BookingCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Cart ID' })
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cart_id: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ApiProperty({
    example: '2023-01-10T09:51:57.037Z',
    description: 'Booking finished time',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  finishedAt: Date;

  @ApiProperty({ example: '1', description: 'Payment Method ID' })
  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
  })
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({ example: '1', description: 'Discount Coupon ID' })
  @ForeignKey(() => Coupon)
  @Column({
    type: DataType.INTEGER,
  })
  discount_coupon_id: number;

  @BelongsTo(() => Coupon)
  discount_coupon: Coupon;

  @ApiProperty({ example: '1', description: 'Status ID' })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Status)
  status: Status;
}
