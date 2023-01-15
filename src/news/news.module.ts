import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/category/entity/category.entity';
import { News } from './entity/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [SequelizeModule.forFeature([News, Category]), JwtModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
