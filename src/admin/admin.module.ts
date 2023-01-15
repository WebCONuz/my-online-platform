import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AccessTokenStrategy,
  RefreshTokenFromBearerStrategy,
  RefreshTokenFromCookieStrategy,
} from '../common/strategies';
import { MediaModule } from '../media/media.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entity/admin.entity';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), JwtModule, MediaModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    AccessTokenStrategy,
    RefreshTokenFromCookieStrategy,
    RefreshTokenFromBearerStrategy,
  ],
})
export class AdminModule {}
