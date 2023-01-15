import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateDto } from '../admin/dto/activate-admin.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entity/news.entity';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsRepository: typeof News) {}

  // Create News Service
  async create(createBody: CreateNewsDto) {
    try {
      return await this.newsRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all News Service
  async getAll() {
    try {
      return await this.newsRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one News by Id Service
  async getOne(id: number) {
    try {
      return await this.newsRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update News Service
  async update(id: number, updateBody: UpdateNewsDto) {
    try {
      return this.newsRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete News Service
  async delete(id: number) {
    try {
      return await this.newsRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Checked and Approved News Service
  async checkedNews(activateDto: ActivateDto) {
    try {
      const { id, value } = activateDto;
      const news = await this.getOne(+id);

      if (!news) {
        throw new BadRequestException('Bunday news mavjud emas!');
      }

      const activatedNews = await this.newsRepository.update(
        { is_checked: value, is_approved: value },
        { where: { id: news['id'], is_checked: !value }, returning: true },
      );

      if (!activatedNews[1][0]) {
        throw new HttpException(
          'Already activated or deactivated',
          HttpStatus.FORBIDDEN,
        );
      }
      return activatedNews[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
