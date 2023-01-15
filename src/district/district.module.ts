import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { District } from './entity/district.entity';

@Module({
  imports: [SequelizeModule.forFeature([District]), JwtModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
