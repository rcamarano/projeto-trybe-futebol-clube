import { ITeam } from '../Interfaces/teams/ITeam';
import SequelizeTeam from '../database/models/SeqTeamModel';
import SequelizeMatch from '../database/models/SeqMatchModel';
import { homeTeamsData, awayTeamsData, teamsClassified } from '../utils/leaderBoardsInfo';

export default class LeaderBoardService {
  static async getHomeLeaderBoard() {
    const getTeams = await SequelizeTeam.findAll();

    const homeTeams = getTeams.map(async (team) => {
      const homeMathces = await SequelizeMatch.findAll({
        where: {
          homeTeamId: team.id,
          inProgress: false,
        },
      });

      const homeStats = homeMathces.map((match) => (
        homeTeamsData(team.teamName, [match])
      ));

      const teamsStats = homeStats[homeMathces.length - 1];
      return { ...teamsStats };
    });

    const results = await Promise.all(homeTeams);
    const orderdResults = teamsClassified(results);
    return orderdResults;
  }

  static async getAwayLeaderBoard() {
    const getTeams = await SequelizeTeam.findAll() as ITeam[];

    const awayTeams = getTeams.map(async (team) => {
      const awayMatches = await SequelizeMatch.findAll({
        where: {
          awayTeamId: team.id,
          inProgress: false,
        },
      });

      const awayStats = awayMatches.map((match) => (
        awayTeamsData(team.teamName, [match])
      ));

      const teamsStats = awayStats[awayMatches.length - 1];
      return { ...teamsStats };
    });

    const results = await Promise.all(awayTeams);
    const orderdResults = teamsClassified(results);
    return orderdResults;
  }
}
