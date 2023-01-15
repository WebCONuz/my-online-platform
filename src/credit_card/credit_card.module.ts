import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entity/user.entity';
import { CreditCardController } from './credit_card.controller';
import { CreditCardService } from './credit_card.service';
import { CreditCard } from './entity/credit-card.entity';

@Module({
  imports: [SequelizeModule.forFeature([CreditCard, User]), JwtModule],
  controllers: [CreditCardController],
  providers: [CreditCardService],
})
export class CreditCardModule {}
