import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserEmail = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().userEmail;
  },
);
