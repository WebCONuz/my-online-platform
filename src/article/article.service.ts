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
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private articleRepository: typeof Article,
    private readonly mediaService: MediaService,
    private readonly userOpinionService: UserOpinionService,
  ) {}

  // Create Article Service
  async create(createBody: CreateArticleDto) {
    try {
      return await this.articleRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Article Service
  async getAll() {
    try {
      // Get all Article list
      const data = await this.articleRepository.findAll({
        include: { all: true },
      });

      let newData = [];
      for (let i = 0; i < data.length; i++) {
        // Add files & user opinions to Article
        const dataFiles = await this.mediaService.getMediaByName(
          'article',
          data[i].id,
        );
        const dataOpinion = await this.userOpinionService.getOpinionByName(
          'article',
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
        const articleOne = await this.getOne(i + 1);
        let opt = articleOne['opinions'];

        for (let i = 0; i < opt.length; i++) {
          total_star += opt[i].dataValues.star;
          n++;
        }
        let starAvg = Math.round((total_star / n) * 10) / 10;

        await this.articleRepository.update(
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

  // Get one Article by Id Service
  async getOne(id: number) {
    const data = await this.articleRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday article mavjud emas!');
    }

    // Get Files & Opinions
    const dataFiles = await this.mediaService.getMediaByName('article', id);
    const dataOpinion = await this.userOpinionService.getOpinionByName(
      'article',
      id,
    );
    const obj: Record<string, any> = {
      ...data,
      files: dataFiles,
      opinions: dataOpinion,
    };

    // Return new Article with Files & Opinions list
    return {
      ...obj.dataValues,
      files: [...obj.files],
      opinions: [...obj.opinions],
    };
  }

  // Update Article Service
  async update(id: number, updateBody: UpdateArticleDto) {
    try {
      return this.articleRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Article by name Service
  async updateStar(id: number, star: number) {
    try {
      return this.articleRepository.update(
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

  // Delete Article Service
  async delete(id: number) {
    try {
      const delArticle = await this.articleRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delArticle) {
        throw new BadRequestException('Bunday article mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('article', delArticle.id);
      await this.articleRepository.destroy({ where: { id } });

      return { message: "Element o'chirildi" };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Checked and Approved Article Service
  async checkedArticle(activateDto: ActivateDto) {
    try {
      const { id, value } = activateDto;
      const article = await this.getOne(+id);

      if (!article) {
        throw new BadRequestException('Bunday article mavjud emas!');
      }

      const activatedArticle = await this.articleRepository.update(
        { is_checked: value, is_approved: value },
        { where: { id: article['id'], is_checked: !value }, returning: true },
      );

      if (!activatedArticle[1][0]) {
        throw new HttpException(
          'Already activated or deactivated',
          HttpStatus.FORBIDDEN,
        );
      }
      return activatedArticle[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
