import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { validateAuthToken } from '../auth/validate.token';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = await context.switchToHttp().getRequest();
    const { authToken } = await request?.cookies;
    return (request.userEmail = await validateAuthToken(
      authToken,
      context.switchToHttp().getResponse(),
    ));
  }
}
