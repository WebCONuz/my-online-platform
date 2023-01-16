import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/author/entity/author.entity';
import { Category } from 'src/category/entity/category.entity';
import { MediaModule } from '../media/media.module';
import { UserOpinionModule } from '../user_opinion/user_opinion.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Article, Category, Author]),
    MediaModule,
    JwtModule,
    UserOpinionModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
