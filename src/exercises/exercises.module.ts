import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from '../author/entity/author.entity';
import { Category } from '../category/entity/category.entity';
import { MediaModule } from '../media/media.module';
import { Exercises } from './entity/exercise.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Exercises, Category, Author]),
    MediaModule,
    JwtModule,
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
