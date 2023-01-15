import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from '../course/entity/course.entity';
import { Status } from '../status/entity/status.entity';
import { User } from '../user/entity/user.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entity/cart.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Status, User, Course]),
    JwtModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
