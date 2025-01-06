import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { msg } from '../constants/messages';
import { secrets } from '../constants/secrets';

config();

export const validateAuthToken = async (
  authToken: string,
  res: any,
): Promise<any> => {
  if (!authToken) {
    throw new UnauthorizedException(msg.YOU_MUST_TO_LOGIN);
  }
  try {
    const jwtService = new JwtService({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: secrets.EXPIRES_IN },
    });
    const { email } = jwtService.verify(authToken);
    return email;
  } catch (error) {
    await deleteAuthToken(res);
    throw new UnauthorizedException(msg.INVALID_OR_EXPIRED_TOKEN);
  }
};

export const deleteAuthToken = async (res: any): Promise<any> => {
  return res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};
