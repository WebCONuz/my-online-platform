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
import {
  AllAdminGuard,
  AllGuard,
  UserAdminReqBodyGuard,
} from '../common/guards';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
import { Opinion } from './entity/opinion.entity';
import { UserOpinionService } from './user_opinion.service';

@ApiTags('User Opinion')
@Controller('opinion')
export class UserOpinionController {
  constructor(private readonly opinionService: UserOpinionService) {}

  // Create Opinion Controller
  @ApiOperation({ summary: 'Create Opinion' })
  @ApiResponse({ status: 201, type: Opinion })
  @UseGuards(AllGuard)
  @Post()
  create(@Body() createBody: CreateOpinionDto) {
    return this.opinionService.create(createBody);
  }

  // Get all Opinion Controller
  @ApiOperation({ summary: 'Get all Opinion' })
  @ApiResponse({ status: 200, type: [Opinion] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.opinionService.getAll();
  }

  // Get one Opinion Controller
  @ApiOperation({ summary: 'Get one Opinion' })
  @ApiResponse({ status: 200, type: Opinion })
  @UseGuards(UserAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.opinionService.getOne(+id);
  }

  // Update Opinion Controller
  @ApiOperation({ summary: 'Update Opinion' })
  @ApiResponse({ status: 200, type: Opinion })
  @UseGuards(UserAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateOpinionDto) {
    return this.opinionService.update(+id, updateBody);
  }

  // Delete Opinion Controller
  @ApiOperation({ summary: 'Delete Opinion' })
  @ApiResponse({ status: 200, type: Opinion })
  @UseGuards(UserAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.opinionService.delete(+id);
  }
}
