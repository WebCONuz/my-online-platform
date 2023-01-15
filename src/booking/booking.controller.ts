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
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entity/booking.entity';
import { BookingService } from './booking.service';
import { AllAdminGuard } from '../common/guards';

@ApiTags('Booking')
@Controller('booking')
@UseGuards(AllAdminGuard) // UserAdminReqBodyGuard
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Create Booking Controller
  @ApiOperation({ summary: 'Create Booking' })
  @ApiResponse({ status: 201, type: Booking })
  @Post()
  create(@Body() createBody: CreateBookingDto) {
    return this.bookingService.create(createBody);
  }

  // Get all Booking Controller
  @ApiOperation({ summary: 'Get all Booking' })
  @ApiResponse({ status: 200, type: [Booking] })
  @Get()
  getAll() {
    return this.bookingService.getAll();
  }

  // Get one Booking Controller
  @ApiOperation({ summary: 'Get one Booking' })
  @ApiResponse({ status: 200, type: Booking })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.bookingService.getOne(+id);
  }

  // Update Booking Controller
  @ApiOperation({ summary: 'Update Booking' })
  @ApiResponse({ status: 200, type: Booking })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBody);
  }

  // Delete Booking Controller
  @ApiOperation({ summary: 'Delete Booking' })
  @ApiResponse({ status: 200, type: Booking })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookingService.delete(+id);
  }
}
