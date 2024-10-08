import { UnauthorizedException } from '@nestjs/common';
import { msg } from '../constants/messages';
import { secrets } from '../constants/secrets';
import { JwtService } from '@nestjs/jwt';

export const validateAuthToken = async (authToken: string): Promise<any> => {
  if (!authToken) {
    throw new UnauthorizedException(msg.YOU_MUST_TO_LOGIN);
  }
  const jwtService = new JwtService({
    secret: secrets.JWT_KEY,
    signOptions: { expiresIn: '3600000s' },
  });
  try {
    return jwtService.verify(authToken);
  } catch (error) {
    throw new UnauthorizedException(msg.INVALID_OR_EXPIRED_TOKEN);
  }
};
