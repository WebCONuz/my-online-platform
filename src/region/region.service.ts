import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entity/region.entity';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepository: typeof Region) {}

  // Create Region Service
  async create(createBody: CreateRegionDto) {
    try {
      return await this.regionRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Region Service
  async getAll() {
    try {
      return await this.regionRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Region by Id Service
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

  // Update Region Service
  async update(id: number, updateBody: UpdateRegionDto) {
    try {
      return this.regionRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Region Service
  async delete(id: number) {
    try {
      return await this.regionRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
