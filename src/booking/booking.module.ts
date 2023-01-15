import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '../cart/entity/cart.entity';
import { Coupon } from '../discount_coupon_id/entity/coupon.entity';
import { PaymentMethod } from '../payment_method/entity/payment-method.entity';
import { Status } from '../status/entity/status.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking, Cart, PaymentMethod, Coupon, Status]),
    JwtModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
