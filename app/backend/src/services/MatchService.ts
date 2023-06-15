import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getMatches(progress: string | undefined): Promise<IMatch[]> {
    if (progress !== undefined) {
      const inProgress = progress === 'true';
      const allMatchesInProgress = await this.matchModel.findAllInProgress(inProgress);

      return allMatchesInProgress;
    }

    const allMatches = await this.matchModel.findAll();

    return allMatches;
  }

  public async finishMatch(id: number) {
    await this.matchModel.finishingMatch(id);

    return {
      message: 'Finished',
    };
  }

  public async updateMatch(id: number, matchData: IMatch) {
    await this.matchModel.updateMatch(id, matchData);

    return {
      message: 'Updated',
    };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const newMatch = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    return {
      message: 'Created',
      data: newMatch,
    };
  }
}
