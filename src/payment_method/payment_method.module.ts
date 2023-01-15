import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './entity/payment-method.entity';
import { PaymentMethodController } from './payment_method.controller';
import { PaymentMethodService } from './payment_method.service';

@Module({
  imports: [SequelizeModule.forFeature([PaymentMethod]), JwtModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
