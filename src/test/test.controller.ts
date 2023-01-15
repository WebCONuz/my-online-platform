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
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entity/test.entity';
import { AllAdminGuard } from '../common/guards';
import { ActivateDto } from '../admin/dto/activate-admin.dto';

@ApiTags('Test')
@Controller('test')
@UseGuards(AllAdminGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  // Create Test Controller
  @ApiOperation({ summary: 'Create Test' })
  @ApiResponse({ status: 201, type: Test })
  @Post()
  create(@Body() createBody: CreateTestDto) {
    return this.testService.create(createBody);
  }

  // Get all Test Controller
  @ApiOperation({ summary: 'Get all Test' })
  @ApiResponse({ status: 200, type: [Test] })
  @Get()
  getAll() {
    return this.testService.getAll();
  }

  // Get one Test Controller
  @ApiOperation({ summary: 'Get one Test' })
  @ApiResponse({ status: 200, type: Test })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.testService.getOne(+id);
  }

  // Update Test Controller
  @ApiOperation({ summary: 'Update Test' })
  @ApiResponse({ status: 200, type: Test })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateTestDto) {
    return this.testService.update(+id, updateBody);
  }

  // Delete Test Controller
  @ApiOperation({ summary: 'Delete Test' })
  @ApiResponse({ status: 200, type: Test })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.testService.delete(+id);
  }

  // Checked and Approved Test Controller
  @ApiOperation({ summary: 'Checked & Approved Test' })
  @ApiResponse({ status: 200, type: Test })
  @Post('checked')
  checked(@Body() activateBody: ActivateDto) {
    return this.testService.checkedTest(activateBody);
  }
}
