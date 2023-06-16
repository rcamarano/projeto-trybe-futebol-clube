import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();

router.get('/home', (req:Request, res:Response) => {
  LeaderBoardController.leaderBoardHome(req, res);
});

router.get('/away', (req:Request, res:Response) => {
  LeaderBoardController.leaderBoardAway(req, res);
});

export default router;
