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
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
    // @Inject(forwardRef(() => ArticleService))
    // private readonly articleService: ArticleService,
    @InjectModel(Opinion) private opinionRepository: typeof Opinion,
  ) {}

  // Create Opinion Service
  async create(createBody: CreateOpinionDto) {
    try {
      const opinion = await this.opinionRepository.create(createBody);

      // Get Opinion for only Course or Article
      const allOpinions = await this.opinionRepository.findAll({
        where: {
          target_table_name: opinion.target_table_name,
          target_table_id: String(opinion.target_table_id),
        },
        include: { all: true },
      });

      // Calculate average value
      let total_star = 0,
        n = 0;
      for (let i = 0; i < allOpinions.length; i++) {
        total_star += allOpinions[i].star;
        n++;
      }
      let star = Math.round((total_star / n) * 10) / 10;
      console.log(total_star, n, star);

      // Update star of Course or Article
      if (opinion.target_table_name === 'course') {
        await this.courseService.updateStar(+opinion.target_table_id, star);
      } else if (opinion.target_table_name === 'article') {
        // await this.articleService.updateStar(+opinion.target_table_id, star);
      }

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
