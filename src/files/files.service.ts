import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createImage(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static', 'images');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Rasmni yuklashda xatolik!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createVideo(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.mp4';
      const filePath = path.resolve(__dirname, '..', 'static', 'videos');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Videoni yuklashda xatolik!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPdf(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.pdf';
      const filePath = path.resolve(__dirname, '..', 'static', 'files');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Faylni yuklashda xatolik!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
