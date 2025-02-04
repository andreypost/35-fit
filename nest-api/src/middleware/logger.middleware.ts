import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('LoggerMiddleware Request Body: ', req.body);
    console.log('LoggerMiddleware Request Query: ', req.query);
    console.log('LoggerMiddleware Request Url: ', req.url);
    next();
  }
}
