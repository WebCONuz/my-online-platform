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
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { Posts } from './entity/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private postsRepository: typeof Posts,
    private readonly mediaService: MediaService,
  ) {}

  // Create Posts Service
  async create(createBody: CreatePostsDto) {
    try {
      return await this.postsRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Posts Service
  async getAll() {
    try {
      // Get all Posts list
      const data = await this.postsRepository.findAll({
        include: { all: true },
      });

      // Add files to Posts
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        const dataFiles = await this.mediaService.getMediaByName(
          'posts',
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

  // Get one Posts by Id Service
  async getOne(id: number) {
    const data = await this.postsRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday posts mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('posts', id);
    const obj: Record<string, any> = { ...data, files: dataFiles };

    // Return new Posts & Files list
    return { ...obj.dataValues, files: [...obj.files] };
  }

  // Update Posts Service
  async update(id: number, updateBody: UpdatePostsDto) {
    try {
      return this.postsRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Posts Service
  async delete(id: number) {
    const delPost = await this.postsRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (!delPost) {
      throw new BadRequestException('Bunday post mavjud emas!');
    }

    await this.mediaService.deleteMediaByName('posts', delPost.id);
    await this.postsRepository.destroy({ where: { id } });

    return { message: "Element o'chirildi" };
  }

  // Checked and Approved Posts Service
  async checkedPosts(activateDto: ActivateDto) {
    try {
      const { id, value } = activateDto;
      const posts = await this.getOne(+id);

      if (!posts) {
        throw new BadRequestException('Bunday posts mavjud emas!');
      }

      const activatedPosts = await this.postsRepository.update(
        { is_checked: value, is_approved: value },
        { where: { id: posts['id'], is_checked: !value }, returning: true },
      );

      if (!activatedPosts[1][0]) {
        throw new HttpException(
          'Already activated or deactivated',
          HttpStatus.FORBIDDEN,
        );
      }
      return activatedPosts[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
