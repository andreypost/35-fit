import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Audit Logger Middleware Request Body: ', req.body);
    // console.log('Audit Logger Middleware Request Query: ', req.query);
    console.log('Audit Logger Middleware Request Url: ', req.url);
    // console.log('Audit Logger Middleware Response: ', res);
    next();
  }
}
