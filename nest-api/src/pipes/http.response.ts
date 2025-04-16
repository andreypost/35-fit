import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

export const HttpResponse = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => {
    console.log('Http Response Pipe');
    return context.switchToHttp().getResponse<Response>();
  },
);
