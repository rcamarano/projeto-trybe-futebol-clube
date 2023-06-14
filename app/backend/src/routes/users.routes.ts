import { Router } from 'express';

import UserService from '../services/UserService';
import UsersController from '../controllers/UserController';
import UserModel from '../models/UserModel';

import Validations from '../middlewares/Validations';
import TokenGeneratorJwt from '../services/TokenGeneratorJwt';
import EncrypterBcryptService from '../services/EncrypterBcryptService';

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

export default router;
