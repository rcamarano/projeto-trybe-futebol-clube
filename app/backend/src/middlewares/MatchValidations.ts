import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

async function MatchValidations(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  const teamService = new TeamService();

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeam = await teamService.findById(homeTeamId);
  const awayTeam = await teamService.findById(awayTeamId);

  if (homeTeam.status === 'NOT_FOUND' || awayTeam.status === 'NOT_FOUND') {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }

  next();
}

export default MatchValidations;
