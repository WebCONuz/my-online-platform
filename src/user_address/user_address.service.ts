import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserAddressDto } from './dto/create-address.dto';
import { UpdateUserAddressDto } from './dto/update-address.dto';
import { UserAddress } from './entity/address.entity';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress) private userAddressRepository: typeof UserAddress,
  ) {}

  // Create UserAddress Service
  async create(createBody: CreateUserAddressDto) {
    try {
      return await this.userAddressRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all UserAddress Service
  async getAll() {
    try {
      return await this.userAddressRepository.findAll({
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one UserAddress by Id Service
  async getOne(id: number) {
    try {
      return await this.userAddressRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update UserAddress Service
  async update(id: number, updateBody: UpdateUserAddressDto) {
    try {
      return this.userAddressRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete UserAddress Service
  async delete(id: number) {
    try {
      return await this.userAddressRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
