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
import { UserOpinionService } from '../user_opinion/user_opinion.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entity/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private courseRepository: typeof Course,
    private readonly mediaService: MediaService,
    private readonly userOpinionService: UserOpinionService,
  ) {}

  // Create Course Service
  async create(createBody: CreateCourseDto) {
    try {
      return await this.courseRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Course Service
  async getAll() {
    try {
      // Get all Course list
      const data = await this.courseRepository.findAll({
        include: { all: true },
      });

      let newData = [];
      for (let i = 0; i < data.length; i++) {
        // Add files & user opinions to Course
        const dataFiles = await this.mediaService.getMediaByName(
          'course',
          data[i].id,
        );
        const dataOpinion = await this.userOpinionService.getOpinionByName(
          'course',
          data[i].id,
        );
        const obj = { ...data[i], files: dataFiles, opinions: dataOpinion };
        newData.push({
          ...obj.dataValues,
          files: [...obj.files],
          opinions: [...obj.opinions],
        });

        // Update total star
        let id = i + 1,
          total_star = 0,
          n = 0;
        const courseOne = await this.getOne(i + 1);
        let opt = courseOne['opinions'];

        for (let i = 0; i < opt.length; i++) {
          total_star += opt[i].dataValues.star;
          n++;
        }
        let starAvg = Math.round((total_star / n) * 10) / 10;

        await this.courseRepository.update(
          { total_star: starAvg },
          {
            where: { id },
            returning: true,
          },
        );
      }

      // return new list
      return newData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Course by Id Service
  async getOne(id: number): Promise<Object> {
    // Get Course
    const data = await this.courseRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday course mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('course', id);
    const dataOpinion = await this.userOpinionService.getOpinionByName(
      'course',
      id,
    );
    const obj: Record<string, any> = {
      ...data,
      files: dataFiles,
      opinions: dataOpinion,
    };

    // Return new Course with Files & Opinions list
    return {
      ...obj.dataValues,
      files: [...obj.files],
      opinions: [...obj.opinions],
    };
  }

  // Update Course Service
  async update(id: number, updateBody: UpdateCourseDto) {
    try {
      return this.courseRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Course by name Service
  async updateStar(id: number, star: number) {
    try {
      return this.courseRepository.update(
        { total_star: star },
        {
          where: { id },
          returning: true,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Course Service
  async delete(id: number) {
    try {
      const delCourse = await this.courseRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delCourse) {
        throw new BadRequestException('Bunday course mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('course', delCourse.id);
      await this.courseRepository.destroy({ where: { id } });

      return { message: "Element o'chirildi" };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Checked and Approved Course Service
  async checkedCourse(activateDto: ActivateDto) {
    try {
      const { id, value } = activateDto;
      const course = await this.getOne(+id);

      if (!course) {
        throw new BadRequestException('Bunday course mavjud emas!');
      }

      const activatedCourse = await this.courseRepository.update(
        { is_checked: value, is_approved: value },
        { where: { id: course['id'], is_checked: !value }, returning: true },
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
