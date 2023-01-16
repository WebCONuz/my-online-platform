import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleService } from '../article/article.service';
import { CourseService } from '../course/course.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
import { Opinion } from './entity/opinion.entity';

@Injectable()
export class UserOpinionService {
  constructor(
    @InjectModel(Opinion) private opinionRepository: typeof Opinion,
  ) {}

  // Create Opinion Service
  async create(createBody: CreateOpinionDto) {
    try {
      const opinion = await this.opinionRepository.create(createBody);
      return opinion;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Opinion Service
  async getAll() {
    try {
      return await this.opinionRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Opinion Service
  async getOpinionByName(table_name: string, target_id: number) {
    try {
      return await this.opinionRepository.findAll({
        where: {
          target_table_name: table_name,
          target_table_id: String(target_id),
        },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Opinion by Id Service
  async getOne(id: number) {
    try {
      return await this.opinionRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Opinion Service
  async update(id: number, updateBody: UpdateOpinionDto) {
    try {
      return this.opinionRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Opinion Service
  async delete(id: number) {
    try {
      return await this.opinionRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
