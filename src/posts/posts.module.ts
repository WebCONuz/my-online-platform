import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/author/entity/author.entity';
import { MediaModule } from '../media/media.module';
import { Posts } from './entity/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Posts, Author]),
    MediaModule,
    JwtModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
