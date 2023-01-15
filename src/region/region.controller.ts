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
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entity/region.entity';
import { RegionService } from './region.service';

@ApiTags('Region')
@Controller('region')
@UseGuards(AllAdminGuard)
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // Create Region Controller
  @ApiOperation({ summary: 'Create Region' })
  @ApiResponse({ status: 201, type: Region })
  @Post()
  create(@Body() createBody: CreateRegionDto) {
    return this.regionService.create(createBody);
  }

  // Get all Region Controller
  @ApiOperation({ summary: 'Get all Region' })
  @ApiResponse({ status: 200, type: [Region] })
  @Get()
  getAll() {
    return this.regionService.getAll();
  }

  // Get one Region Controller
  @ApiOperation({ summary: 'Get one Region' })
  @ApiResponse({ status: 200, type: Region })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.regionService.getOne(+id);
  }

  // Update Region Controller
  @ApiOperation({ summary: 'Update Region' })
  @ApiResponse({ status: 200, type: Region })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateRegionDto) {
    return this.regionService.update(+id, updateBody);
  }

  // Delete Region Controller
  @ApiOperation({ summary: 'Delete Region' })
  @ApiResponse({ status: 200, type: Region })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.regionService.delete(+id);
  }
}
