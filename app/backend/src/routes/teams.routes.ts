import { Router, Request, Response } from 'express';

import TeamController from '../controllers/TeamController';

const teamsController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default router;
