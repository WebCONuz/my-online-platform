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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entity/course.entity';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Create Course Controller
  @ApiOperation({ summary: 'Create Course' })
  @ApiResponse({ status: 201, type: Course })
  @UseGuards(AuthorAdminAllGuard)
  @Post()
  create(@Body() createBody: CreateCourseDto) {
    return this.courseService.create(createBody);
  }

  // Get all Course Controller
  @ApiOperation({ summary: 'Get all Course' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  // Get one Course Controller
  @ApiOperation({ summary: 'Get one Course' })
  @ApiResponse({ status: 200, type: Course })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.courseService.getOne(+id);
  }

  // Update Course Controller
  @ApiOperation({ summary: 'Update Course' })
  @ApiResponse({ status: 200, type: Course })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateCourseDto) {
    return this.courseService.update(+id, updateBody);
  }

  // Delete Course Controller
  @ApiOperation({ summary: 'Delete Course' })
  @ApiResponse({ status: 200, type: Course })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.courseService.delete(+id);
  }

  // Checked and Approved Course Controller
  @ApiOperation({ summary: 'Checked & Approved Course' })
  @ApiResponse({ status: 200, type: Course })
  @UseGuards(AllAdminGuard)
  @Post('checked')
  checked(@Body() activateBody: ActivateDto) {
    return this.courseService.checkedCourse(activateBody);
  }
}
