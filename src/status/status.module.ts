import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './entity/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [SequelizeModule.forFeature([Status]), JwtModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
