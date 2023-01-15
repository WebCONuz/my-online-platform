import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllAdminGuard } from '../common/guards';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entity/media.entity';
import { MediaService } from './media.service';

@ApiTags('Media')
@Controller('media')
@UseGuards(AllAdminGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // Create Media Controller
  @ApiOperation({ summary: 'Create Media' })
  @ApiResponse({ status: 201, type: Media })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createBody: CreateMediaDto, @UploadedFile() file) {
    return this.mediaService.create(createBody, file);
  }

  // Get all Media Controller
  @ApiOperation({ summary: 'Get all Media' })
  @ApiResponse({ status: 200, type: [Media] })
  @Get()
  getAll() {
    return this.mediaService.getAll();
  }

  // Get one Media Controller
  @ApiOperation({ summary: 'Get one Media' })
  @ApiResponse({ status: 200, type: Media })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.mediaService.getOne(+id);
  }

  // Update Media Controller
  @ApiOperation({ summary: 'Update Media' })
  @ApiResponse({ status: 200, type: Media })
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: number,
    @Body() updateBody: UpdateMediaDto,
    @UploadedFile() file,
  ) {
    return this.mediaService.update(+id, updateBody, file);
  }

  // Delete Media Controller
  @ApiOperation({ summary: 'Delete Media' })
  @ApiResponse({ status: 200, type: Media })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.mediaService.delete(+id);
  }
}
