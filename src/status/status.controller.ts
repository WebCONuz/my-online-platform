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
import { AllAdminGuard } from '../common/guards';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entity/status.entity';
import { StatusService } from './status.service';

@ApiTags('Status')
@Controller('status')
@UseGuards(AllAdminGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  // Create Status Controller
  @ApiOperation({ summary: 'Create Status' })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  create(@Body() createBody: CreateStatusDto) {
    return this.statusService.create(createBody);
  }

  // Get all Status Controller
  @ApiOperation({ summary: 'Get all Status' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  getAll() {
    return this.statusService.getAll();
  }

  // Get one Status Controller
  @ApiOperation({ summary: 'Get one Status' })
  @ApiResponse({ status: 200, type: Status })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.statusService.getOne(+id);
  }

  // Update Status Controller
  @ApiOperation({ summary: 'Update Status' })
  @ApiResponse({ status: 200, type: Status })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateStatusDto) {
    return this.statusService.update(+id, updateBody);
  }

  // Delete Status Controller
  @ApiOperation({ summary: 'Delete Status' })
  @ApiResponse({ status: 200, type: Status })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.statusService.delete(+id);
  }
}
