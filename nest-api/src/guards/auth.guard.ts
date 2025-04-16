import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.routes';
import { CustomRequest } from '../types/custom.request';
import { validateAuthToken } from './auth.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Auth Guard');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<CustomRequest>();
    const { authToken } = request?.cookies;

    const userEmail = await validateAuthToken(
      authToken,
      httpContext.getResponse<Response>(),
    );
    if (!userEmail) return false;

    request.userEmail = userEmail;
    return true;
  }
}
