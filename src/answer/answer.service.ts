import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entity/answer.entity';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(Answer) private answerRepository: typeof Answer) {}

  // Create Answer Service
  async create(createBody: CreateAnswerDto) {
    try {
      return await this.answerRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Answer Service
  async getAll() {
    try {
      return await this.answerRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Answer by Id Service
  async getOne(id: number) {
    try {
      return await this.answerRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Answer Service
  async update(id: number, updateBody: UpdateAnswerDto) {
    try {
      return this.answerRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Answer Service
  async delete(id: number) {
    try {
      return await this.answerRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
