import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

export const HttpResponse = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => {
    return context.switchToHttp().getResponse<Response>();
  },
);
