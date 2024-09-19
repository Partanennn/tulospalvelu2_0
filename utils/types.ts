export interface StatGroup {
  gameDays: any[];
  gameRules: string;
  levelID: number;
  levelName: string;
  playOffStandings: string;
  playerRoles: any[];
  seasonNumber: number;
  serieAreaID: number;
  serieId: number;
  serieName: string;
  showStandings: boolean;
  statGroupID: number;
  statGroupName: string;
  teams: any[];
  winPoints: number;
}

export type StandingTeam = {
  Games: number;
  GoalDiff: number;
  GoalsAgainst: number;
  GoalsFor: number;
  Looses: number;
  OtLooses: number;
  OtWins: number;
  PenaltyMinutes: number;
  Points: number;
  PointsPerGame: number;
  Ranking: number;
  SeasonID: number;
  StatGroupID: string;
  TeamAbbrv: string;
  TeamAssociation: string;
  TeamID: string;
  TeamImg: string;
  Ties: number;
  UniqueID: number;
  Wins: number;
};
