import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FormatEmptyObjects } from 'src/shared/utils/format-empty-objects';

@Injectable()
export class EmptyBodyMiddleware implements NestMiddleware {
  removeEmptyObjects(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
        this.removeEmptyObjects(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key]; // Remove a propriedade se estiver vazia
        }
      }
    }
    return obj;
  }
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body || Object.keys(req.body).length === 0) {
      req.query = FormatEmptyObjects(req.query);
      req.body = FormatEmptyObjects(req.body);
      req.query = this.removeEmptyObjects(req.query);
    }
    next();
  }
}
