import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EmptyBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET' && !req.query) {
      req.query = {}; // Certifique-se de que req.query existe
    }
    next();
  }
}
