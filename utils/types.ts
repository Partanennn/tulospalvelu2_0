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
