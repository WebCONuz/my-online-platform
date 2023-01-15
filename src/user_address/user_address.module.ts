import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from 'src/district/entity/district.entity';
import { Region } from 'src/region/entity/region.entity';
import { User } from 'src/user/entity/user.entity';
import { UserAddress } from './entity/address.entity';
import { UserAddressController } from './user_address.controller';
import { UserAddressService } from './user_address.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserAddress, User, Region, District]),
    JwtModule,
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
