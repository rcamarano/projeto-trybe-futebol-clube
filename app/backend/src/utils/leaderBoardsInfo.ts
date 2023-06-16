import { ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';

type IMatches = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

const teams = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const restartTeam = () => {
  teams.totalPoints = 0;
  teams.totalGames = 0;
  teams.totalVictories = 0;
  teams.totalDraws = 0;
  teams.totalLosses = 0;
  teams.goalsFavor = 0;
  teams.goalsOwn = 0;
  teams.goalsBalance = 0;
  teams.efficiency = 0;
};

const homeTeamVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const awayTeamVictory = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 3;
  teams.totalLosses += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const homeDraw = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const awayDraw = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const homeTeamLoss = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 0;
  teams.totalLosses += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const awayTeamLoss = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 0;
  teams.totalVictories += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const homePoints = (matches: IMatches[]) => {
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      homeTeamVictory(match.homeTeamGoals, match.awayTeamGoals);
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      homeDraw(match.homeTeamGoals, match.awayTeamGoals);
    } else {
      homeTeamLoss(match.homeTeamGoals, match.awayTeamGoals);
    }
  });
};

const awayPoints = (matches: IMatches[]) => {
  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      awayTeamVictory(match.homeTeamGoals, match.awayTeamGoals);
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      awayDraw(match.homeTeamGoals, match.awayTeamGoals);
    } else {
      awayTeamLoss(match.homeTeamGoals, match.awayTeamGoals);
    }
  });
};

const homeTeamsData = (name: string, matches: IMatches[]) => {
  if (name !== teams.name) {
    restartTeam();
  }

  teams.name = name;
  homePoints(matches);
  teams.totalGames += 1;

  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );

  return teams;
};

const awayTeamsData = (name: string, matches: IMatches[]) => {
  if (name !== teams.name) {
    restartTeam();
  }

  teams.name = name;
  awayPoints(matches);
  teams.totalGames += 1;

  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );
  return teams;
};

const teamsClassified = (matches: ILeaderBoard[]) =>
  matches.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    if (b.goalsFavor !== a.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }

    return b.goalsOwn - a.goalsOwn;
  });

export {
  homeTeamsData,
  awayTeamsData,
  teamsClassified,
};
