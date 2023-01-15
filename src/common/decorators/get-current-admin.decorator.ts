import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../types';

export const getCurrentAdmin = createParamDecorator(
  // Callback function
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    // Request Object
    const request = context.switchToHttp().getRequest();

    // Checked Data
    if (!data) return request.user;

    // Return Info by data
    return request.user[data];
  },
);
