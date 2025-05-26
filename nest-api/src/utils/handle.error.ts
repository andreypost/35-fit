import { HttpException, ServiceUnavailableException } from '@nestjs/common';
import { msg } from '../constants/messages';

export const handleError = (error: unknown): never => {
  console.error('Handle Error: ', error);
  if (error instanceof HttpException) {
    throw error;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    throw new HttpException((error as any).message, 500);
  }
  throw new ServiceUnavailableException(msg.UNEXPECTED_ERROR);
};

export const isPgUniqueViolation = (
  error: unknown,
  statusCode: string,
): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === statusCode
  );
};
