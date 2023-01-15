import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/category/entity/category.entity';
import { MediaModule } from '../media/media.module';
import { Test } from './entity/test.entity';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Test, Category]),
    MediaModule,
    JwtModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
