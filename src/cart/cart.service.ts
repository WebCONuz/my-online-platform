import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartRepository: typeof Cart) {}

  // Create Cart Service
  async create(createBody: CreateCartDto) {
    try {
      return await this.cartRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Cart Service
  async getAll() {
    try {
      return await this.cartRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Cart by Id Service
  async getOne(id: number) {
    try {
      return await this.cartRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Cart Service
  async update(id: number, updateBody: UpdateCartDto) {
    try {
      return this.cartRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Cart Service
  async delete(id: number) {
    try {
      return await this.cartRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
