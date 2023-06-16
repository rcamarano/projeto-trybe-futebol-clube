import { Request, Response, Router } from 'express';

import UserService from '../services/UserService';
import UsersController from '../controllers/UserController';
import UserModel from '../models/UserModel';

import Validations from '../middlewares/Validations';
import TokenGeneratorJwt from '../services/TokenGeneratorJwt';
import EncrypterBcryptService from '../services/EncrypterBcryptService';
import TokenValidation from '../middlewares/TokenValidation';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UserService(userModel, encrypter, tokenGenerator);
const userController = new UsersController(userService);

const router = Router();

router.post(
  '/login',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);

router.get('/login/role', TokenValidation, async (req: Request, res: Response) => {
  const user = await userModel.findById(res.locals.user.id);
  res.status(200).json({ role: user?.role });
});

export default router;
