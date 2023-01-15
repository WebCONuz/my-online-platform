// Payload va rereshTokendan iborat type

import { JwtPayload } from '.';

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
