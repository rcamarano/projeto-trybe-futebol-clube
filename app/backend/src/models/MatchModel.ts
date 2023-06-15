import SequelizeMatches from '../database/models/SeqMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamModel from '../database/models/SeqTeamModel';

export default class MatchModel {
  private model = SequelizeMatches;

  modelIncludes = [
    {
      model: TeamModel,
      as: 'homeTeam',
      attributes: [
        'teamName',
      ],
    },
    {
      model: TeamModel,
      as: 'awayTeam',
      attributes: [
        'teamName',
      ],
    },
  ];

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: this.modelIncludes,
    });
    return dbData;
  }

  async findAllInProgress(progress: boolean): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: {
        inProgress: progress,
      },
      include: this.modelIncludes,
    });
    return dbData;
  }

  async finishingMatch(matchId: number) {
    const dbData = await this.model.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
    return dbData;
  }

  async updateMatch(matchId: number, matchData: IMatch) {
    const dbData = await this.model.update(
      { ...matchData },
      { where: { id: matchId } },
    );
    return dbData;
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const dbData = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return dbData;
  }
}
