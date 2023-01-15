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
import { ExercisesService } from './exercises.service';
import { CreateExercisesDto } from './dto/create-exercises.dto';
import { UpdateExercisesDto } from './dto/update-exercises.dto';
import { Exercises } from './entity/exercise.entity';
import {
  AllAdminGuard,
  AuthorAdminAllGuard,
  AuthorAdminReqBodyGuard,
} from '../common/guards';
import { ActivateDto } from '../admin/dto/activate-admin.dto';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  // Create Exercises Controller
  @ApiOperation({ summary: 'Create Exercises' })
  @ApiResponse({ status: 201, type: Exercises })
  @UseGuards(AuthorAdminAllGuard)
  @Post()
  create(@Body() createBody: CreateExercisesDto) {
    return this.exercisesService.create(createBody);
  }

  // Get all Exercises Controller
  @ApiOperation({ summary: 'Get all Exercises' })
  @ApiResponse({ status: 200, type: [Exercises] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.exercisesService.getAll();
  }

  // Get one Exercises Controller
  @ApiOperation({ summary: 'Get one Exercises' })
  @ApiResponse({ status: 200, type: Exercises })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.exercisesService.getOne(+id);
  }

  // Update Exercises Controller
  @ApiOperation({ summary: 'Update Exercises' })
  @ApiResponse({ status: 200, type: Exercises })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateExercisesDto) {
    return this.exercisesService.update(+id, updateBody);
  }

  // Delete Exercises Controller
  @ApiOperation({ summary: 'Delete Exercises' })
  @ApiResponse({ status: 200, type: Exercises })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.exercisesService.delete(+id);
  }

  // Checked and Approved Exercises Controller
  @ApiOperation({ summary: 'Checked & Approved Exercises' })
  @ApiResponse({ status: 200, type: Exercises })
  @UseGuards(AllAdminGuard)
  @Post('checked')
  checked(@Body() activateBody: ActivateDto) {
    return this.exercisesService.checkedExercise(activateBody);
  }
}
