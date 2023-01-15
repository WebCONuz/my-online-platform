import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entity/coupon.entity';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon) private couponRepository: typeof Coupon) {}

  // Create Coupon Service
  async create(createBody: CreateCouponDto) {
    try {
      return await this.couponRepository.create(createBody);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get all Coupon Service
  async getAll() {
    try {
      return await this.couponRepository.findAll({ include: { all: true } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Coupon by Id Service
  async getOne(id: number) {
    try {
      return await this.couponRepository.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Coupon Service
  async update(id: number, updateBody: UpdateCouponDto) {
    try {
      return this.couponRepository.update(updateBody, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Coupon Service
  async delete(id: number) {
    try {
      return await this.couponRepository.destroy({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
