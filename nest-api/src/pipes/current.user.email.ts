import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserEmail = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // console.log('Current User Email Pipe');
    return context.switchToHttp().getRequest().userEmail;
  },
);
