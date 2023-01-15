import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from 'src/test/entity/test.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './entity/answer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Answer, Test]), JwtModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
