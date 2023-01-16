import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from '../author/entity/author.entity';
import { Category } from '../category/entity/category.entity';
import { MediaModule } from '../media/media.module';
import { UserOpinionModule } from '../user_opinion/user_opinion.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entity/course.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Course, Category, Author]),
    JwtModule,
    MediaModule,
    UserOpinionModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
