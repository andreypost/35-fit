import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ExecutionTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    console.log('Nest Interceptor Before...');

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`Nest Interceptor After... ${Date.now() - now} ms`),
        ),
      );
  }
}
