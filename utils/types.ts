import { ReactNode } from "react";

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

export type ChildrenType = {
  children: ReactNode;
};

export type StandingTeam = {
  Games: string;
  GoalDiff: string;
  GoalsAgainst: string;
  GoalsFor: string;
  Looses: string;
  OtLooses: string;
  OtWins: string;
  PenaltyMinutes: string;
  Points: string;
  PointsPerGame: string;
  Ranking: string;
  SeasonID: string;
  StatGroupID: string;
  TeamAbbrv: string;
  TeamAssociation: string;
  TeamID: string;
  TeamImg: string;
  Ties: string;
  UniqueID: string;
  Wins: string;
};

export type PlayerStatsBase = {
  Count: number;
  Players: PlayerStats[];
  PlayersID: string[];
  SortedBy: string;
  TeamID: number;
};

export type PlayerStats = {
  CurrentTeam: string;
  CurrentTeamAssID: string;
  FirstName: string;
  Img: string;
  JerseyNr: string;
  LastName: string;
  LinkID: string;
  PlayerAssists: number;
  PlayerGames: number;
  PlayerGoals: number;
  PlayerGoalsPP: number;
  PlayerGoalsSH: number;
  PlayerID: number;
  PlayerMinus: number;
  PlayerPS: number;
  PlayerPSFailed: number;
  PlayerPen2Min: number;
  PlayerPen5Min: number;
  PlayerPen10Min: number;
  PlayerPen20Min: number;
  PlayerPen25Min: number;
  PlayerPenaltyMin: number;
  PlayerPlus: number;
  PlayerPlusMinus: number;
  PlayerPoints: number;
  PlayerShifts: number;
  PlayerTimeOnIce: number;
  PlayerTimeOnIcePerGame: number;
  PlayerWinGoal: number;
  Ranking: number;
  RoleAbbrv: string;
  RoleID: string;
  TeamAbbrv: string;
  TeamImg: string;
  TeamStats: any[];
  ToiStats: any[];
  Yob: string;
};
