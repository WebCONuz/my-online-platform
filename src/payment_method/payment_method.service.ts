import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from './entity/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod)
    private paymentMethodRepository: typeof PaymentMethod,
  ) {}

  // Create PaymentMethod Service
  async create(createBody: CreatePaymentMethodDto) {
    try {
      return await this.paymentMethodRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all PaymentMethod Service
  async getAll() {
    try {
      return await this.paymentMethodRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one PaymentMethod by Id Service
  async getOne(id: number) {
    try {
      return await this.paymentMethodRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update PaymentMethod Service
  async update(id: number, updateBody: UpdatePaymentMethodDto) {
    try {
      return this.paymentMethodRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete PaymentMethod Service
  async delete(id: number) {
    try {
      return await this.paymentMethodRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
