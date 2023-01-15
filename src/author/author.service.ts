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
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entity/author.entity';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { LoginAuthorDto } from './dto/login-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { MediaService } from '../media/media.service';
import { ActivateDto } from '../admin/dto/activate-admin.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author) private authorRepository: typeof Author,
    private jwtService: JwtService,
    private readonly mediaService: MediaService,
  ) {}

  // Signup Author Service
  async signup(authBody: CreateAuthorDto, res: Response): Promise<Tokens> {
    try {
      const condidate = await this.authorRepository.findOne({
        where: { email: authBody.email },
      });
      if (condidate) {
        throw new BadRequestException('Bunday author bazada mavjud');
      }

      const hashedPassword = await bcrypt.hash(authBody.password, 7);
      const newAuthor = await this.authorRepository.create({
        ...authBody,
        password: hashedPassword,
      });

      const tokens = await this.getTokens(
        newAuthor.id,
        newAuthor.email,
        newAuthor.is_active,
      );
      await this.updateRefreshTokenHash(newAuthor.id, tokens.refresh_token);

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Login Author Service
  async signin(authBody: LoginAuthorDto, res: Response): Promise<Tokens> {
    try {
      const author = await this.authorRepository.findOne({
        where: { email: authBody.email },
      });
      if (!author) {
        throw new BadRequestException('Login yoki parol xato!');
      }

      // Compare two Passwords
      const passwordMatches = await bcrypt.compare(
        authBody.password,
        author.password,
      );
      if (!passwordMatches) {
        throw new BadRequestException('Login yoki parol xato!');
      }

      // Generate Access & Refresh Tokens
      const tokens = await this.getTokens(
        author.id,
        author.email,
        author.is_active,
      );

      // Hashed Refresh Token & update it in Admin DB
      await this.updateRefreshTokenHash(author.id, tokens.refresh_token);

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

  // Activate Author Service
  async activate(activateDto: ActivateDto) {
    const { id, value } = activateDto;
    const author = await this.getOne(+id);

    const activatedAdmin = await this.authorRepository.update(
      { is_active: value },
      { where: { id: +author.id, is_active: !value }, returning: true },
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
    authorId: number,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens> {
    try {
      // Checked Admin
      const author = await this.authorRepository.findOne({
        where: { id: authorId },
      });
      if (!author || !author.hashed_refresh_token)
        throw new ForbiddenException("Kirishga ruxsat yo'q");

      // Compare two refresh Tokens
      const rfMatches = await bcrypt.compare(
        refreshToken,
        author.hashed_refresh_token,
      );
      if (!rfMatches) throw new ForbiddenException("Kirishga ruxsat yo'q");

      // Generate new Access & Refresh tokens
      const tokens = await this.getTokens(
        author.id,
        author.email,
        author.is_active,
      );

      // Write Refresh Token to Cookie
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
      });

      // Write new Refresh Token to DB
      await this.updateRefreshTokenHash(author.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Logout Author Service
  async logout(id: number, res: Response): Promise<boolean> {
    try {
      // Update & Clear Refresh Token from DB
      const author = await this.authorRepository.update(
        { hashed_refresh_token: null },
        { where: { id } },
      );

      // Cheked Logout
      if (!author) throw new ForbiddenException('Login qilinmagan');

      // Clear Cookie
      res.clearCookie('refresh_token');
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Get All Author Service
  async getAll() {
    try {
      // Get all Course list
      const data = await this.authorRepository.findAll({
        include: { all: true },
      });

      // Add files to Course
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        const dataFiles = await this.mediaService.getMediaByName(
          'author',
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

  // Get one Author by Id Service
  async getOne(id: number) {
    const data = await this.authorRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!data) {
      throw new BadRequestException('Bunday author mavjud emas!');
    }

    // Get Files
    const dataFiles = await this.mediaService.getMediaByName('author', id);
    const obj: Record<string, any> = { ...data, files: dataFiles };

    // Return new Course & Files list
    return { ...obj.dataValues, files: [...obj.files] };
  }

  // Update Author Service
  async update(id: number, updateBody: UpdateAuthorDto) {
    try {
      let data = {};

      // Checked Author
      const author = await this.authorRepository.findOne({
        where: { id },
        include: { all: true },
      });
      if (!author) {
        throw new BadRequestException('Bunday author mavjud emas');
      }

      // Compare two Passwords
      if (updateBody.password) {
        const hashPassword = await bcrypt.hash(updateBody.password, 7);
        data = { ...updateBody, password: hashPassword };
      } else {
        data = { ...updateBody };
      }

      return this.authorRepository.update(data, {
        where: { id },
        returning: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Delete Author Service
  async delete(id: number) {
    try {
      const delAuthor = await this.authorRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!delAuthor) {
        throw new BadRequestException('Bunday author mavjud emas!');
      }

      await this.mediaService.deleteMediaByName('author', delAuthor.id);
      await this.authorRepository.destroy({ where: { id } });

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
    await this.authorRepository.update(
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
  ): Promise<Tokens> {
    // Create Payload
    const jwtPayload = {
      sub: id,
      email: email,
      is_active,
      is_author: true,
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
