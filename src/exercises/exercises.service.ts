import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateDto } from '../admin/dto/activate-admin.dto';
import { MediaService } from '../media/media.service';
import { CreateExercisesDto } from './dto/create-exercises.dto';
import { UpdateExercisesDto } from './dto/update-exercises.dto';
import { Exercises } from './entity/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercises) private exercisesRepository: typeof Exercises,
    private readonly mediaService: MediaService,
  ) {}

  // Create Exercises Service
  async create(createBody: CreateExercisesDto) {
    try {
      return await this.exercisesRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Exercises Service
  async getAll() {
    try {
      // Get all Course list
      const data = await this.exercisesRepository.findAll({
        include: { all: true },
      });

      // Add files to Course
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        const dataFiles = await this.mediaService.getMediaByName(
          'exercises',
          data[i].id,
        );
        const obj = { ...data[i], files: dataFiles };
        newData.push({ ...obj.dataValues, files: [...obj.files] });
      }

      // return new list
      return newData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Exercises by Id Service
  async getOne(id: number) {
    const data = await this.exercisesRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday exercise mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('exercises', id);
    const obj: Record<string, any> = { ...data, files: dataFiles };

    // Return new Course & Files list
    return { ...obj.dataValues, files: [...obj.files] };
  }

  // Update Exercises Service
  async update(id: number, updateBody: UpdateExercisesDto) {
    try {
      return this.exercisesRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Exercises Service
  async delete(id: number) {
    try {
      const delExercises = await this.exercisesRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delExercises) {
        throw new BadRequestException('Bunday exercise mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('exercises', delExercises.id);
      await this.exercisesRepository.destroy({ where: { id } });

      return { message: "Element o'chirildi" };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Checked and Approved Exercise Service
  async checkedExercise(activateDto: ActivateDto) {
    try {
      const { id, value } = activateDto;
      const exercise = await this.getOne(+id);

      if (!exercise) {
        throw new BadRequestException('Bunday exercise mavjud emas!');
      }

      const activatedCourse = await this.exercisesRepository.update(
        { is_checked: value, is_active: value },
        { where: { id: exercise['id'], is_checked: !value }, returning: true },
      );

      if (!activatedCourse[1][0]) {
        throw new HttpException(
          'Already activated or deactivated',
          HttpStatus.FORBIDDEN,
        );
      }
      return activatedCourse[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
