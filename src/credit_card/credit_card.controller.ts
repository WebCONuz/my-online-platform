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
import { CreditCardService } from './credit_card.service';
import { CreateCreditCardDto } from './dto/create-card.dto';
import { UpdateCreditCardDto } from './dto/update-card.dto';
import { CreditCard } from './entity/credit-card.entity';

@ApiTags('Credit Card')
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  // Create CreditCard Controller
  @ApiOperation({ summary: 'Create CreditCard' })
  @ApiResponse({ status: 201, type: CreditCard })
  @UseGuards(UserAdminAllGuard)
  @Post()
  create(@Body() createBody: CreateCreditCardDto) {
    return this.creditCardService.create(createBody);
  }

  // Get all CreditCard Controller
  @ApiOperation({ summary: 'Get all CreditCard' })
  @ApiResponse({ status: 200, type: [CreditCard] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.creditCardService.getAll();
  }

  // Get one CreditCard Controller
  @ApiOperation({ summary: 'Get one CreditCard' })
  @ApiResponse({ status: 200, type: CreditCard })
  @UseGuards(UserAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.creditCardService.getOne(+id);
  }

  // Update CreditCard Controller
  @ApiOperation({ summary: 'Update CreditCard' })
  @ApiResponse({ status: 200, type: CreditCard })
  @UseGuards(UserAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateCreditCardDto) {
    return this.creditCardService.update(+id, updateBody);
  }

  // Delete CreditCard Controller
  @ApiOperation({ summary: 'Delete CreditCard' })
  @ApiResponse({ status: 200, type: CreditCard })
  @UseGuards(UserAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.creditCardService.delete(+id);
  }
}
