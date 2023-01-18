import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { Tokens } from 'src/common/types';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MediaService } from '../media/media.service';
import { EmailService } from '../email/email.service';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
    private readonly mediaService: MediaService,
    private readonly mailService: EmailService,
    private readonly botService: TelegramBotService,
  ) {}

  // Signup User Service
  async signup(authBody: CreateUserDto, res: Response): Promise<Tokens> {
    try {
      const condidate = await this.userRepository.findOne({
        where: { email: authBody.email },
      });
      if (condidate) {
        throw new BadRequestException('Bunday foydalanuvchi bazada mavjud');
      }

      const hashedPassword = await bcrypt.hash(authBody.password, 7);
      const newUser = await this.userRepository.create({
        ...authBody,
        password: hashedPassword,
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      this.mailService.sendMail(newUser.email, "Salom, Ro'yxatdan o'tdingiz.");
      this.botService.sendMessage(
        `${newUser.email} user tizimdan ro'yxatdan o'tdi.`,
      );

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Login User Service
  async signin(authBody: LoginUserDto, res: Response): Promise<Tokens> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: authBody.email },
      });
      if (!user) {
        throw new BadRequestException('Login yoki parol xato!');
      }

      // Compare two Passwords
      const passwordMatches = await bcrypt.compare(
        authBody.password,
        user.password,
      );
      if (!passwordMatches) {
        throw new BadRequestException('Login yoki parol xato!');
      }

      // Generate Access & Refresh Tokens
      const tokens = await this.getTokens(user.id, user.email);

      // Hashed Refresh Token & update it in Admin DB
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

      // Write Refresh Token to Cookie
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Servicelar: Email & TelegramBot
      this.mailService.sendMail(user.email, 'Salom, Siz tizimga kirdingiz.');
      this.botService.sendMessage(`${user.email} user tizimga login qildi.`);

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Refresh Token Service
  async refresh(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens> {
    try {
      // Checked Admin
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user || !user.hashed_refresh_token)
        throw new ForbiddenException("Kirishga ruxsat yo'q");

      // Compare two refresh Tokens
      const rfMatches = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token,
      );
      if (!rfMatches) throw new ForbiddenException("Kirishga ruxsat yo'q");

      // Generate new Access & Refresh tokens
      const tokens = await this.getTokens(user.id, user.email);

      // Write Refresh Token to Cookie
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
      });

      // Write new Refresh Token to DB
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Logout User Service
  async logout(id: number, res: Response): Promise<boolean> {
    try {
      // Update & Clear Refresh Token from DB
      const user = await this.userRepository.update(
        { hashed_refresh_token: null },
        { where: { id } },
      );

      // Cheked Logout
      if (!user) throw new ForbiddenException('Login qilinmagan');

      // Clear Cookie
      res.clearCookie('refresh_token');
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get All User Service
  async getAll() {
    try {
      // Get all Course list
      const data = await this.userRepository.findAll({
        include: { all: true },
      });

      // Add files to Course
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        const dataFiles = await this.mediaService.getMediaByName(
          'user',
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

  // Get one User by Id Service
  async getOne(id: number) {
    const data = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday user mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('user', id);
    const obj: Record<string, any> = { ...data, files: dataFiles };

    // Return new Course & Files list
    return { ...obj.dataValues, files: [...obj.files] };
  }

  // Update User Service
  async update(id: number, updateBody: UpdateUserDto) {
    try {
      let data = {};

      // Checked User
      const user = await this.userRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!user) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud emas');
      }

      // Compare two Passwords
      if (updateBody.password) {
        const hashPassword = await bcrypt.hash(updateBody.password, 7);
        data = { ...updateBody, password: hashPassword };
      } else {
        data = { ...updateBody };
      }

      return this.userRepository.update(data, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete User Service
  async delete(id: number) {
    try {
      const delUser = await this.userRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delUser) {
        throw new BadRequestException('Bunday user mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('user', delUser.id);
      await this.userRepository.destroy({ where: { id } });

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
    await this.userRepository.update(
      {
        hashed_refresh_token: hashedReftreshToken,
      },
      {
        where: { id },
      },
    );
  }

  // Access & Refresh Token Generator
  async getTokens(id: number, email: string): Promise<Tokens> {
    // Create Payload
    const jwtPayload = {
      sub: id,
      email: email,
      is_user: true,
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
