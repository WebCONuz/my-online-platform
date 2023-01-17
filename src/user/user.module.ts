import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AccessTokenStrategy,
  RefreshTokenFromBearerStrategy,
  RefreshTokenFromCookieStrategy,
} from 'src/common/strategies';
import { EmailModule } from '../email/email.module';
import { MediaModule } from '../media/media.module';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule,
    MediaModule,
    EmailModule,
    TelegramBotModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AccessTokenStrategy,
    RefreshTokenFromCookieStrategy,
    RefreshTokenFromBearerStrategy,
  ],
})
export class UserModule {}
