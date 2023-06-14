import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();

    if (!allTeams) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Nenhum time encontrado' },
      };
    }

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.fundById(id);

    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Time não encontrado' },
      };
    }

    return { status: 'SUCCESSFUL', data: team };
  }
}
