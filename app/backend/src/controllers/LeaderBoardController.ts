import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async leaderBoardHome(_req: Request, res: Response) {
    const leaderBoard = await LeaderBoardService.getHomeLeaderBoard();
    res.status(200).json(leaderBoard);
  }

  static async leaderBoardAway(_req: Request, res: Response) {
    const leaderBoard = await LeaderBoardService.getAwayLeaderBoard();
    res.status(200).json(leaderBoard);
  }
}
