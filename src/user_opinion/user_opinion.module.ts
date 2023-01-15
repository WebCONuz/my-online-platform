import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleModule } from '../article/article.module';
import { CourseModule } from '../course/course.module';
import { User } from '../user/entity/user.entity';
import { Opinion } from './entity/opinion.entity';
import { UserOpinionController } from './user_opinion.controller';
import { UserOpinionService } from './user_opinion.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Opinion, User]),
    JwtModule,
    CourseModule,
    // ArticleModule,
    // forwardRef(() => CourseModule),
  ],
  controllers: [UserOpinionController],
  providers: [UserOpinionService],
  exports: [UserOpinionService],
})
export class UserOpinionModule {}
