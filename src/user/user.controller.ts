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
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from 'src/common/types';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import {
  getCurrentAdmin,
  GetCurrentAdminId,
  Public,
} from 'src/common/decorators';
import {
  AccessTokenGuard,
  AllAdminGuard,
  RefreshTokenGuard,
  UserAdminGuard,
} from 'src/common/guards';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Sign Up User Controller
  @ApiOperation({ summary: 'SignUp User' })
  @ApiResponse({ status: 201, type: User })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() createBody: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.userService.signup(createBody, res);
  }

  // Login User Controller
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 201, type: User })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  login(
    @Body() createBody: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.userService.signin(createBody, res);
  }

  // Logout User Controller
  @ApiOperation({ summary: 'Logout User' })
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentAdminId() id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.userService.logout(id, res);
  }

  // Refresh User Controller
  @ApiOperation({ summary: 'Refresh User' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentAdminId() adminId: number,
    @getCurrentAdmin('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.userService.refresh(adminId, refreshToken, res);
  }

  //Get all users Controller
  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AllAdminGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  // Get one User Controller
  @ApiOperation({ summary: 'Get one User' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(UserAdminGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.getOne(+id);
  }

  // Update User Controller
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(UserAdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateBody: UpdateUserDto) {
    return this.userService.update(+id, updateBody);
  }

  // Delete User Controller
  @ApiOperation({ summary: 'Delete User' })
  @UseGuards(UserAdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(+id);
  }
}
