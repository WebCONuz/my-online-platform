import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  getCurrentAdmin,
  GetCurrentAdminId,
  Public,
} from 'src/common/decorators';
import {
  AccessTokenGuard,
  AllAdminGuard,
  AuthorAdminGuard,
  RefreshTokenGuard,
} from 'src/common/guards';
import { Tokens } from 'src/common/types';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { LoginAuthorDto } from './dto/login-author.dto';
import { Author } from './entity/author.entity';
import { Response } from 'express';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ActivateDto } from '../admin/dto/activate-admin.dto';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // Sign Up Author Controller
  @ApiOperation({ summary: 'SignUp Author' })
  @ApiResponse({ status: 201, type: Author })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() createBody: CreateAuthorDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.authorService.signup(createBody, res);
  }

  // Login Author Controller
  @ApiOperation({ summary: 'Login Author' })
  @ApiResponse({ status: 201, type: Author })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  login(
    @Body() createBody: LoginAuthorDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.authorService.signin(createBody, res);
  }

  // Activete Author Controller
  @ApiOperation({ summary: 'activate author' })
  @UseGuards(AllAdminGuard)
  @Post('activate')
  @HttpCode(HttpStatus.OK)
  async activate(@Body() activateDto: ActivateDto) {
    return this.authorService.activate(activateDto);
  }

  // Logout Author Controller
  @ApiOperation({ summary: 'Logout Author' })
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentAdminId() id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authorService.logout(id, res);
  }

  // Refresh Author Controller
  @ApiOperation({ summary: 'Refresh Author' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentAdminId() adminId: number,
    @getCurrentAdmin('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.authorService.refresh(adminId, refreshToken, res);
  }

  //Get all authors Controller
  @ApiOperation({ summary: 'Get all Author' })
  @ApiResponse({ status: 200, type: [Author] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.authorService.getAll();
  }

  // Get one Author Controller
  @ApiOperation({ summary: 'Get one Author' })
  @ApiResponse({ status: 200, type: Author })
  @UseGuards(AuthorAdminGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.authorService.getOne(+id);
  }

  // Update Author Controller
  @ApiOperation({ summary: 'Update Author' })
  @ApiResponse({ status: 200, type: Author })
  @UseGuards(AuthorAdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateAuthorDto) {
    return this.authorService.update(+id, updateBody);
  }

  // Delete Author Controller
  @ApiOperation({ summary: 'Delete Author' })
  @ApiResponse({ status: 200, type: Author })
  @UseGuards(AuthorAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.authorService.delete(+id);
  }
}
