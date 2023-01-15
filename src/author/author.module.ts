import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AccessTokenStrategy,
  RefreshTokenFromBearerStrategy,
  RefreshTokenFromCookieStrategy,
} from 'src/common/strategies';
import { MediaModule } from '../media/media.module';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { Author } from './entity/author.entity';

@Module({
  imports: [SequelizeModule.forFeature([Author]), JwtModule, MediaModule],
  controllers: [AuthorController],
  providers: [
    AuthorService,
    AccessTokenStrategy,
    RefreshTokenFromCookieStrategy,
    RefreshTokenFromBearerStrategy,
  ],
})
export class AuthorModule {}
