import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.email || !user.password) {
      return res.status(400)
        .json({ message: 'All fields must be filled' });
    }

    if (!validEmail.test(user.email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.password === undefined || user.password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default Validations;
