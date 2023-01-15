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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entity/news.entity';
import { AllAdminGuard } from '../common/guards';
import { ActivateDto } from '../admin/dto/activate-admin.dto';

@ApiTags('News')
@Controller('news')
@UseGuards(AllAdminGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // Create News Controller
  @ApiOperation({ summary: 'Create News' })
  @ApiResponse({ status: 201, type: News })
  @Post()
  create(@Body() createBody: CreateNewsDto) {
    return this.newsService.create(createBody);
  }

  // Get all News Controller
  @ApiOperation({ summary: 'Get all News' })
  @ApiResponse({ status: 200, type: [News] })
  @Get()
  getAll() {
    return this.newsService.getAll();
  }

  // Get one News Controller
  @ApiOperation({ summary: 'Get one News' })
  @ApiResponse({ status: 200, type: News })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.newsService.getOne(+id);
  }

  // Update News Controller
  @ApiOperation({ summary: 'Update News' })
  @ApiResponse({ status: 200, type: News })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateNewsDto) {
    return this.newsService.update(+id, updateBody);
  }

  // Delete News Controller
  @ApiOperation({ summary: 'Delete News' })
  @ApiResponse({ status: 200, type: News })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.newsService.delete(+id);
  }

  // Checked and Approved News Controller
  @ApiOperation({ summary: 'Checked & Approved News' })
  @ApiResponse({ status: 200, type: News })
  @Post('checked')
  checked(@Body() activateBody: ActivateDto) {
    return this.newsService.checkedNews(activateBody);
  }
}
