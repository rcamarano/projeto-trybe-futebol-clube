import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function TokenValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const verification = verify(token, 'jwt_secret');

    res.locals.user = verification;

    next();
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
