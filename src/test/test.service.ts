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
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entity/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test) private testRepository: typeof Test,
    private readonly mediaService: MediaService,
  ) {}

  // Create Test Service
  async create(createBody: CreateTestDto) {
    try {
      return await this.testRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Test Service
  async getAll() {
    try {
      // Get all Test list
      const data = await this.testRepository.findAll({
        include: { all: true },
      });

      // Add files to Test
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        const dataFiles = await this.mediaService.getMediaByName(
          'test',
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

  // Get one Test by Id Service
  async getOne(id: number) {
    const data = await this.testRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday test mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('test', id);
    const obj: Record<string, any> = { ...data, files: dataFiles };

    // Return new Test & Files list
    return { ...obj.dataValues, files: [...obj.files] };
  }

  // Update Test Service
  async update(id: number, updateBody: UpdateTestDto) {
    try {
      return this.testRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Test Service
  async delete(id: number) {
    try {
      const delTest = await this.testRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delTest) {
        throw new BadRequestException('Bunday test mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('test', delTest.id);
      await this.testRepository.destroy({ where: { id } });

      return { message: "Element o'chirildi" };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Checked and Approved Test Service
  async checkedTest(activateDto: ActivateDto) {
    try {
      const { id, value } = activateDto;
      const test = await this.getOne(+id);

      if (!test) {
        throw new BadRequestException('Bunday test mavjud emas!');
      }

      const activatedTest = await this.testRepository.update(
        { is_checked: value, is_active: value },
        { where: { id: test['id'], is_checked: !value }, returning: true },
      );

      if (!activatedTest[1][0]) {
        throw new HttpException(
          'Already activated or deactivated',
          HttpStatus.FORBIDDEN,
        );
      }
      return activatedTest[1][0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
