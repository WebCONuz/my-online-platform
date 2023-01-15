import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AllAdminGuard,
  UserAdminAllGuard,
  UserAdminReqBodyGuard,
} from '../common/guards';
import { CreateUserAddressDto } from './dto/create-address.dto';
import { UpdateUserAddressDto } from './dto/update-address.dto';
import { UserAddress } from './entity/address.entity';
import { UserAddressService } from './user_address.service';

@ApiTags('User Address')
@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  // Create UserAddress Controller
  @ApiOperation({ summary: 'Create UserAddress' })
  @ApiResponse({ status: 201, type: UserAddress })
  @UseGuards(UserAdminAllGuard)
  @Post()
  create(@Body() createBody: CreateUserAddressDto) {
    return this.userAddressService.create(createBody);
  }

  // Get all UserAddress Controller
  @ApiOperation({ summary: 'Get all UserAddress' })
  @ApiResponse({ status: 200, type: [UserAddress] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.userAddressService.getAll();
  }

  // Get one UserAddress Controller
  @ApiOperation({ summary: 'Get one UserAddress' })
  @ApiResponse({ status: 200, type: UserAddress })
  @UseGuards(UserAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userAddressService.getOne(+id);
  }

  // Update UserAddress Controller
  @ApiOperation({ summary: 'Update UserAddress' })
  @ApiResponse({ status: 200, type: UserAddress })
  @UseGuards(UserAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateUserAddressDto) {
    return this.userAddressService.update(+id, updateBody);
  }

  // Delete UserAddress Controller
  @ApiOperation({ summary: 'Delete UserAddress' })
  @ApiResponse({ status: 200, type: UserAddress })
  @UseGuards(UserAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userAddressService.delete(+id);
  }
}
