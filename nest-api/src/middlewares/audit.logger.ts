import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuditLoggerMiddleware Request Body: ', req.body);
    console.log('AuditLoggerMiddleware Request Query: ', req.query);
    console.log('AuditLoggerMiddleware Request Url: ', req.url);
    // console.log('AuditLoggerMiddleware Response: ', res);
    next();
  }
}
