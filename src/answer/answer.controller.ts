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
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entity/answer.entity';
import { AnswerService } from './answer.service';
import { AllAdminGuard } from '../common/guards';

@ApiTags('Answer')
@Controller('answer')
@UseGuards(AllAdminGuard)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  // Create Answer Controller
  @ApiOperation({ summary: 'Create Answer' })
  @ApiResponse({ status: 201, type: Answer })
  @Post()
  create(@Body() createBody: CreateAnswerDto) {
    return this.answerService.create(createBody);
  }

  // Get all Answer Controller
  @ApiOperation({ summary: 'Get all Answer' })
  @ApiResponse({ status: 200, type: [Answer] })
  @Get()
  getAll() {
    return this.answerService.getAll();
  }

  // Get one Answer Controller
  @ApiOperation({ summary: 'Get one Answer' })
  @ApiResponse({ status: 200, type: Answer })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.answerService.getOne(+id);
  }

  // Update Answer Controller
  @ApiOperation({ summary: 'Update Answer' })
  @ApiResponse({ status: 200, type: Answer })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateAnswerDto) {
    return this.answerService.update(+id, updateBody);
  }

  // Delete Answer Controller
  @ApiOperation({ summary: 'Delete Answer' })
  @ApiResponse({ status: 200, type: Answer })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.answerService.delete(+id);
  }
}
