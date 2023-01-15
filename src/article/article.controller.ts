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
import { ActivateDto } from '../admin/dto/activate-admin.dto';
import {
  AllAdminGuard,
  AuthorAdminAllGuard,
  AuthorAdminReqBodyGuard,
} from '../common/guards';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entity/article.entity';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Create Article Controller
  @ApiOperation({ summary: 'Create Article' })
  @ApiResponse({ status: 201, type: Article })
  @UseGuards(AuthorAdminAllGuard)
  @Post()
  create(@Body() createBody: CreateArticleDto) {
    return this.articleService.create(createBody);
  }

  // Get all Article Controller
  @ApiOperation({ summary: 'Get all Article' })
  @ApiResponse({ status: 200, type: [Article] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.articleService.getAll();
  }

  // Get one Article Controller
  @ApiOperation({ summary: 'Get one Article' })
  @ApiResponse({ status: 200, type: Article })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.articleService.getOne(+id);
  }

  // Update Article Controller
  @ApiOperation({ summary: 'Update Article' })
  @ApiResponse({ status: 200, type: Article })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateArticleDto) {
    return this.articleService.update(+id, updateBody);
  }

  // Delete Article Controller
  @ApiOperation({ summary: 'Delete Article' })
  @ApiResponse({ status: 200, type: Article })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.articleService.delete(+id);
  }

  // Checked and Approved Article Controller
  @ApiOperation({ summary: 'Checked & Approved Article' })
  @ApiResponse({ status: 200, type: Article })
  @UseGuards(AllAdminGuard)
  @Post('checked')
  checked(@Body() activateBody: ActivateDto) {
    return this.articleService.checkedArticle(activateBody);
  }
}
