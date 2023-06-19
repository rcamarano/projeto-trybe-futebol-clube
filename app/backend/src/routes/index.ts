import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './users.routes';
import matchesRouter from './matches.routes';
import leaderBoardRouter from './leaderBoard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
