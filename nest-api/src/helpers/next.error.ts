import { HttpException, ServiceUnavailableException } from '@nestjs/common';
import { msg } from '../constants/messages';

export const nextError = (error: any) => {
  console.error(error);
  if (error instanceof HttpException || error.message) {
    throw error;
  }
  throw new ServiceUnavailableException(msg.UNEXPECTED_ERROR);
};
