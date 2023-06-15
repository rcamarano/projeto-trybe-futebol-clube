import { Router, Request, Response } from 'express';

import MatchController from '../controllers/MatchController';
import TokenValidation from '../middlewares/TokenValidation';
import MatchValidations from '../middlewares/MatchValidations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getMatchesController(req, res));

router.patch('/:id/finish', TokenValidation, (req: Request, res: Response) =>
  matchController.finishMatchController(req, res));

router.patch('/:id', TokenValidation, (req: Request, res: Response) =>
  matchController.updateMatchController(req, res));

router.post('/', TokenValidation, MatchValidations, (req: Request, res: Response) =>
  matchController.createMatchController(req, res));

export default router;
