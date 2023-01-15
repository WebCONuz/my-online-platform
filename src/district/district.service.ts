import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entity/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private regionRepository: typeof District,
  ) {}

  // Create District Service
  async create(createBody: CreateDistrictDto) {
    try {
      return await this.regionRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all District Service
  async getAll() {
    try {
      return await this.regionRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one District by Id Service
  async getOne(id: number) {
    try {
      return await this.regionRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update District Service
  async update(id: number, updateBody: UpdateDistrictDto) {
    try {
      return this.regionRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete District Service
  async delete(id: number) {
    try {
      return await this.regionRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
