import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from 'src/common/types';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entity/admin.entity';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { MediaService } from '../media/media.service';
import { ActivateDto } from './dto/activate-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
    private readonly mediaService: MediaService,
  ) {}

  // Signup Admin Service
  async signup(authBody: CreateAdminDto, res: Response): Promise<Tokens> {
    try {
      const condidate = await this.adminRepository.findOne({
        where: { email: authBody.email },
      });
      if (condidate) {
        throw new BadRequestException('Bunday admin bazada mavjud');
      }

      const hashedPassword = await bcrypt.hash(authBody.password, 7);
      const newAdmin = await this.adminRepository.create({
        ...authBody,
        password: hashedPassword,
      });

      const tokens = await this.getTokens(
        newAdmin.id,
        newAdmin.email,
        newAdmin.is_active,
        newAdmin.is_creator,
      );
      await this.updateRefreshTokenHash(newAdmin.id, tokens.refresh_token);

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Login Admin Service
  async signin(authBody: LoginAdminDto, res: Response): Promise<Tokens> {
    try {
      const admin = await this.adminRepository.findOne({
        where: { email: authBody.email },
      });
      if (!admin) {
        throw new BadRequestException('Login yoki parol xato!');
      }

      // Compare two Passwords
      const passwordMatches = await bcrypt.compare(
        authBody.password,
        admin.password,
      );
      if (!passwordMatches) {
        throw new BadRequestException('Login yoki parol xato!');
      }

      // Generate Access & Refresh Tokens
      const tokens = await this.getTokens(
        admin.id,
        admin.email,
        admin.is_active,
        admin.is_creator,
      );

      // Hashed Refresh Token & update it in Admin DB
      await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

      // Write Refresh Token to Cookie
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Activate Admin Service
  async activate(activateDto: ActivateDto) {
    const { id, value } = activateDto;
    const admin = await this.getOne(+id);

    const activatedAdmin = await this.adminRepository.update(
      { is_active: value },
      { where: { id: +admin.id, is_active: !value }, returning: true },
    );

    if (!activatedAdmin[1][0]) {
      throw new HttpException(
        'Already activated or deactivated',
        HttpStatus.FORBIDDEN,
      );
    }
    return activatedAdmin[1][0];
  }

  // Refresh Token Service
  async refresh(
    adminId: number,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens> {
    try {
      // Checked Admin
      const admin = await this.adminRepository.findOne({
        where: { id: adminId },
      });
      if (!admin || !admin.hashed_refresh_token)
        throw new ForbiddenException("Kirishga ruxsat yo'q");

      // Compare two refresh Tokens
      const rfMatches = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token,
      );
      if (!rfMatches) throw new ForbiddenException("Kirishga ruxsat yo'q");

      // Generate new Access & Refresh tokens
      const tokens = await this.getTokens(
        admin.id,
        admin.email,
        admin.is_active,
        admin.is_creator,
      );

      // Write Refresh Token to Cookie
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
      });

      // Write new Refresh Token to DB
      await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Logout Admin Service
  async logout(id: number, res: Response): Promise<boolean> {
    try {
      // Update & Clear Refresh Token from DB
      const admin = await this.adminRepository.update(
        { hashed_refresh_token: null },
        { where: { id } },
      );

      // Cheked Logout
      if (!admin) throw new ForbiddenException('Login qilinmagan');

      // Clear Cookie
      res.clearCookie('refresh_token');
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get All Admin Service
  async getAll() {
    try {
      // Get all Course list
      const data = await this.adminRepository.findAll({
        include: { all: true },
      });

      // Add files to Course
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        const dataFiles = await this.mediaService.getMediaByName(
          'admin',
          data[i].id,
        );
        const obj = { ...data[i], files: dataFiles };
        newData.push({ ...obj.dataValues, files: [...obj.files] });
      }

      // return new list
      return newData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get one Admin by Id Service
  async getOne(id: number) {
    const data = await this.adminRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday admin mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('admin', id);
    const obj: Record<string, any> = { ...data, files: dataFiles };

    // Return new Course & Files list
    return { ...obj.dataValues, files: [...obj.files] };
  }

  // Update Admin Service
  async update(id: number, updateBody: UpdateAdminDto) {
    try {
      let data = {};

      // Checked Admin
      const admin = await this.adminRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!admin) {
        throw new BadRequestException('Bunday admin mavjud emas');
      }

      // Compare two Passwords
      if (updateBody.password) {
        const hashPassword = await bcrypt.hash(updateBody.password, 7);
        data = { ...updateBody, password: hashPassword };
      } else {
        data = { ...updateBody };
      }

      return this.adminRepository.update(data, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Admin Service
  async delete(id: number) {
    try {
      const delAdmin = await this.adminRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delAdmin) {
        throw new BadRequestException('Bunday admin mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('admin', delAdmin.id);
      await this.adminRepository.destroy({ where: { id } });

      return { message: "Element o'chirildi" };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Update Refresh Token from Admin DB
  async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    // Hashed Refresh Token
    const hashedReftreshToken = await bcrypt.hash(refreshToken, 7);

    // Write Refresh Token to DB
    await this.adminRepository.update(
      {
        hashed_refresh_token: hashedReftreshToken,
      },
      {
        where: { id },
      },
    );
  }

  // Access & Refresh Token Generator
  async getTokens(
    id: number,
    email: string,
    is_active: boolean,
    is_creator: boolean,
  ): Promise<Tokens> {
    // Create Payload
    const jwtPayload = {
      sub: id,
      email,
      is_active,
      is_creator,
      is_admin: true,
    };

    // Create Access & Refresh Token
    const [accessToken, refreshToken] = await Promise.all([
      // Init Access Token
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      // Init Refresh Token
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
