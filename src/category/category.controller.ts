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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';

@ApiTags('Category')
@Controller('category')
@UseGuards(AllAdminGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create Category Controller
  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({ status: 201, type: Category })
  @Post()
  create(@Body() createBody: CreateCategoryDto) {
    return this.categoryService.create(createBody);
  }

  // Get all Category Controller
  @ApiOperation({ summary: 'Get all Category' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  // Get one Category Controller
  @ApiOperation({ summary: 'Get one Category' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoryService.getOne(+id);
  }

  // Update Category Controller
  @ApiOperation({ summary: 'Update Category' })
  @ApiResponse({ status: 200, type: Category })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateBody);
  }

  // Delete Category Controller
  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: 200, type: Category })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.delete(+id);
  }
}
