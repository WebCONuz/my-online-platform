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
  AdminGuard,
  CreatorAdminGuard,
  RefreshTokenGuard,
} from 'src/common/guards';
import { Tokens } from 'src/common/types';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin } from './entity/admin.entity';
import { Response } from 'express';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ActivateDto } from './dto/activate-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Sign Up Admin Controller
  @ApiOperation({ summary: 'SignUp Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() createBody: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.adminService.signup(createBody, res);
  }

  // Login Admin Controller
  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  login(
    @Body() createBody: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.adminService.signin(createBody, res);
  }

  // Activete Admin Controller
  @ApiOperation({ summary: 'activate admin' })
  @UseGuards(CreatorAdminGuard)
  @Post('activate')
  @HttpCode(HttpStatus.OK)
  async activate(@Body() activateDto: ActivateDto) {
    return this.adminService.activate(activateDto);
  }

  // Logout Admin Controller
  @ApiOperation({ summary: 'Logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentAdminId() id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.adminService.logout(id, res);
  }

  // Refresh Admin Controller
  @ApiOperation({ summary: 'Refresh Admin' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentAdminId() adminId: number,
    @getCurrentAdmin('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.adminService.refresh(adminId, refreshToken, res);
  }

  //Get all admins Controller
  @ApiOperation({ summary: 'Get all Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(CreatorAdminGuard)
  @Get()
  getAll() {
    return this.adminService.getAll();
  }

  // Get one Admin Controller
  @ApiOperation({ summary: 'Get one Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.adminService.getOne(+id);
  }

  // Update Admin Controller
  @ApiOperation({ summary: 'Update Admin' })
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateAdminDto) {
    return this.adminService.update(+id, updateBody);
  }

  // Delete Admin Controller
  @ApiOperation({ summary: 'Delete Admin' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.adminService.delete(+id);
  }
}
