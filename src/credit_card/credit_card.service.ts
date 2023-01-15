import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCreditCardDto } from './dto/create-card.dto';
import { UpdateCreditCardDto } from './dto/update-card.dto';
import { CreditCard } from './entity/credit-card.entity';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectModel(CreditCard) private creditCardRepository: typeof CreditCard,
  ) {}

  // Create CreditCard Service
  async create(createBody: CreateCreditCardDto) {
    try {
      return await this.creditCardRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all CreditCard Service
  async getAll() {
    try {
      return await this.creditCardRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one CreditCard by Id Service
  async getOne(id: number) {
    try {
      return await this.creditCardRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update CreditCard Service
  async update(id: number, updateBody: UpdateCreditCardDto) {
    try {
      return this.creditCardRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete CreditCard Service
  async delete(id: number) {
    try {
      return await this.creditCardRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
