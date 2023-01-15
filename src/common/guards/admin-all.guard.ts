import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AllAdminGuard extends AuthGuard('access-jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const access_token = request.headers.authorization;

      const bayer = access_token.split(' ')[0];
      const token = access_token.split(' ')[1];
      if (bayer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
        });
      }

      const admin = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY,
      });

      if (admin.is_active && admin.is_admin) {
        return true;
      } else {
        throw new HttpException('Access denaid', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Admin unauthorized or Forbidden',
      });
    }
  }
}
