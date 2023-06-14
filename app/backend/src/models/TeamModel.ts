import SequelizeTeam from '../database/models/SeqTeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map((item) => ({
      id: item.id,
      teamName: item.teamName,
    }));
  }

  async fundById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return {
      id: dbData.id,
      teamName: dbData.teamName,
    };
  }
}
