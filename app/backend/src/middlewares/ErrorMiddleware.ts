import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: err.message });
    }

    return res.status(500).end();
  }
}
