import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable() // từ khóa để nó hiểu được là 1 custom middleware
export class loggerMiddlewareTest implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    console.log('logger middleware class');
    next();
  }
}
