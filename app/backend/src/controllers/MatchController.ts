import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getMatchesController(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    const serviceResponse = await this.matchService
      .getMatches(inProgress as string | undefined);
    return res.status(200).json(serviceResponse);
  }

  public async finishMatchController(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    return res.status(200).json(serviceResponse);
  }

  public async updateMatchController(req: Request, res: Response) {
    const { id } = req.params;
    const matchData = req.body;
    const serviceResponse = await this.matchService
      .updateMatch(Number(id), matchData);
    return res.status(200).json(serviceResponse);
  }

  public async createMatchController(req: Request, res: Response) {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;

    const serviceResponse = await this.matchService
      .createMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
    return res.status(201).json(serviceResponse.data);
  }
}
