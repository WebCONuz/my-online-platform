import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtPayload } from '../types';

// Get Current Id
export const GetCurrentAdminId = createParamDecorator(
  // callback function
  (_: undefined, context: ExecutionContext): number => {
    // Get Req object from Request
    const request = context.switchToHttp().getRequest();

    // Get admin from Req Object => it write by token in login
    const admin = request.user as JwtPayload;

    if (!admin) {
      throw new InternalServerErrorException(
        'Requestga data yozilmagan. Guardlarni tekshiring.',
      );
    }

    // Return Admin id
    return admin.sub;
  },
);
