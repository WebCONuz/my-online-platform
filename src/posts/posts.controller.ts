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
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { Posts } from './entity/posts.entity';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Create Posts Controller
  @ApiOperation({ summary: 'Create Posts' })
  @ApiResponse({ status: 201, type: Posts })
  @UseGuards(AuthorAdminAllGuard)
  @Post()
  create(@Body() createBody: CreatePostsDto) {
    return this.postsService.create(createBody);
  }

  // Get all Posts Controller
  @ApiOperation({ summary: 'Get all Posts' })
  @ApiResponse({ status: 200, type: [Posts] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  // Get one Posts Controller
  @ApiOperation({ summary: 'Get one Posts' })
  @ApiResponse({ status: 200, type: Posts })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postsService.getOne(+id);
  }

  // Update Posts Controller
  @ApiOperation({ summary: 'Update Posts' })
  @ApiResponse({ status: 200, type: Posts })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdatePostsDto) {
    return this.postsService.update(+id, updateBody);
  }

  // Delete Posts Controller
  @ApiOperation({ summary: 'Delete Posts' })
  @ApiResponse({ status: 200, type: Posts })
  @UseGuards(AuthorAdminReqBodyGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(+id);
  }

  // Checked and Approved Course Controller
  @ApiOperation({ summary: 'Checked & Approved Course' })
  @ApiResponse({ status: 200, type: Posts })
  @UseGuards(AllAdminGuard)
  @Post('checked')
  checked(@Body() activateBody: ActivateDto) {
    return this.postsService.checkedPosts(activateBody);
  }
}
