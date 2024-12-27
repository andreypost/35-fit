import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';
import { CustomRequest } from '../types/custom.request';
import { validateAuthToken } from '../auth/validate.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const cxtHttp = context.switchToHttp();
    const request = cxtHttp.getRequest<CustomRequest>();
    const { authToken } = request?.cookies;

    return (request.userEmail = await validateAuthToken(
      authToken,
      cxtHttp.getResponse<Response>(),
    ));
  }
}
