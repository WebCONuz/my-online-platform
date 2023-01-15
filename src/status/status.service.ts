import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entity/status.entity';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

  // Create Status Service
  async create(createBody: CreateStatusDto) {
    try {
      return await this.statusRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Status Service
  async getAll() {
    try {
      return await this.statusRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Status by Id Service
  async getOne(id: number) {
    try {
      return await this.statusRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Status Service
  async update(id: number, updateBody: UpdateStatusDto) {
    try {
      return this.statusRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Status Service
  async delete(id: number) {
    try {
      return await this.statusRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
