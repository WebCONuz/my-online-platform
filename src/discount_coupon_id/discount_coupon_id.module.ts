import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { CouponController } from './discount_coupon_id.controller';
import { CouponService } from './discount_coupon_id.service';
import { Coupon } from './entity/coupon.entity';

@Module({
  imports: [SequelizeModule.forFeature([Coupon]), JwtModule],
  controllers: [CouponController],
  providers: [CouponService],
})
export class DiscountCouponIdModule {}
