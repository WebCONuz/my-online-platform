import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entity/media.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media) private mediaRepository: typeof Media,
    private readonly fileService: FilesService,
  ) {}

  // Create Media Service
  async create(createBody: CreateMediaDto, file: any) {
    let fileName: string;

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      fileName = await this.fileService.createImage(file);
    } else if (file.mimetype === 'video/mp4') {
      fileName = await this.fileService.createVideo(file);
    } else if (file.mimetype === 'application/pdf') {
      fileName = await this.fileService.createPdf(file);
    } else {
      throw new BadRequestException(
        'Xato fayl kiritildi! (.jpg .png .pm4, .pdf) fayllar kiritilishi mumkin',
      );
    }

    return await this.mediaRepository.create({
      ...createBody,
      media_file: fileName,
    });
  }

  // Get all Media Service
  async getAll() {
    try {
      return await this.mediaRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Media Service
  async getMediaByName(table_name: string, target_id: number) {
    try {
      return await this.mediaRepository.findAll({
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

  // Get one Media by Id Service
  async getOne(id: number) {
    try {
      return await this.mediaRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Media Service
  async update(id: number, updateBody: UpdateMediaDto, file: any) {
    // Checked Media
    const media = await this.mediaRepository.findOne({
      where: { id },
    });
    if (!media) {
      throw new BadRequestException('Bunday media mavjud emas');
    }

    if (file) {
      // Delete old file & Create new file
      let fileName: string;
      const filePath = media.media_file;

      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        fs.unlinkSync(
          path.join(__dirname, '../', '/static', '/images', filePath),
        );
        fileName = await this.fileService.createImage(file);
      } else if (file.mimetype === 'video/mp4') {
        fs.unlinkSync(
          path.join(__dirname, '../', '/static', '/videos', filePath),
        );
        fileName = await this.fileService.createVideo(file);
      } else if (file.mimetype === 'application/pdf') {
        fs.unlinkSync(
          path.join(__dirname, '../', '/static', '/files', filePath),
        );
        fileName = await this.fileService.createPdf(file);
      } else {
        throw new BadRequestException(
          'Xato fayl kiritildi! (.jpg .png .pm4, .pdf) fayllar kiritilishi mumkin',
        );
      }

      // Create new Photo
      return await this.mediaRepository.update(
        { ...updateBody, media_file: fileName },
        {
          where: { id },
          returning: true,
        },
      );
    }

    return this.mediaRepository.update(updateBody, {
      where: { id },
      returning: true,
    });
  }

  // Delete Media Service
  async delete(id: number) {
    // Checked Media
    const media = await this.mediaRepository.findOne({
      where: { id },
    });
    if (!media) {
      throw new BadRequestException('Bunday media mavjud emas');
    }

    const filePath = media.media_file;
    const fileExtname = path.extname(filePath);

    if (fileExtname == '.jpg' || fileExtname == '.png') {
      fs.unlinkSync(
        path.join(__dirname, '../', '/static', '/images', filePath),
      );
    } else if (fileExtname == '.mp4') {
      fs.unlinkSync(
        path.join(__dirname, '../', '/static', '/videos', filePath),
      );
    } else {
      fs.unlinkSync(path.join(__dirname, '../', '/static', '/files', filePath));
    }

    await this.mediaRepository.destroy({ where: { id } });
    return { message: "Element o'chirildi" };
  }

  // Delete Media by Name Service
  async deleteMediaByName(table_name: string, target_id: number) {
    try {
      const delMedia = await this.mediaRepository.findOne({
        where: {
          target_table_name: table_name,
          target_table_id: String(target_id),
        },
        include: { all: true },
      });

      if (delMedia) {
        return await this.delete(delMedia.id);
      } else {
        return;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
