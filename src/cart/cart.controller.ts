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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entity/cart.entity';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Create Cart Controller
  @ApiOperation({ summary: 'Create Cart' })
  @ApiResponse({ status: 201, type: Cart })
  @UseGuards(UserAdminAllGuard)
  @Post()
  create(@Body() createBody: CreateCartDto) {
    return this.cartService.create(createBody);
  }

  // Get all Cart Controller
  @ApiOperation({ summary: 'Get all Cart' })
  @ApiResponse({ status: 200, type: [Cart] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.cartService.getAll();
  }

  // Get one Cart Controller
  @ApiOperation({ summary: 'Get one Cart' })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(UserAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.cartService.getOne(+id);
  }

  // Update Cart Controller
  @ApiOperation({ summary: 'Update Cart' })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(UserAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateCartDto) {
    return this.cartService.update(+id, updateBody);
  }

  // Delete Cart Controller
  @ApiOperation({ summary: 'Delete Cart' })
  @ApiResponse({ status: 200, type: Cart })
  @UseGuards(UserAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cartService.delete(+id);
  }
}
