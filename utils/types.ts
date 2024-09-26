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
  //TeamStats: any[];
  //ToiStats: any[];
  Yob: string;
};

export type TeamMetaData = {
  AreaID: string;
  AssociationID: string;
  AssociationName: string;
  City: string;
  Facebook: string;
  Instagram: string;
  LevelID: string;
  StandingsRanking: string;
  StatGroupID: string;
  StatGroupName: string;
  StreetAddress: string;
  TeamAbbrv: string;
  TeamName: string;
  TeamNextGame: TeamMetaDataGame[];
  Twitter: string;
  Www: string;
  Zip: string;
};

export type TeamMetaDataGame = {
  AwayTeamName: string;
  GameDate: string;
  HomeTeamName: string;
};

export type TeamInfo = {
  AssociationTeams: TeamInfoAssociationTeam[];
  ContactPersons: TeamInfoContactPerson[];
  Games: TeamInfoGame[];
  Players: TeamInfoPlayer[];
  Standings: TeamInfoStanding[];
  StandingsEnabled: boolean;
  StatGroups: TeamInfoGroup[];
  TopScorers: TeamInfoTopScorer[];
  TopScorersEnabled: boolean;
};

export type TeamInfoTopScorer = {
  Assists: number;
  AwayAssists: string;
  AwayGoals: string;
  FirstName: string;
  Goals: number;
  HomeAssists: string;
  HomeGoals: string;
  LastName: string;
  PersonID: string;
  PlayerID: string;
  Points: number;
  StatGroupID: string;
};

export type TeamInfoGroup = {
  AreaID: string;
  LevelID: string;
  StatGroupID: string;
  StatGroupName: string;
};

export type TeamInfoStanding = {
  LevelID: string;
  PointRules: string;
  StatGroupID: string;
  StatGroupName: string;
  Teams: TeamInfoStandingTeam[];
  WinPoints: string;
};

export type TeamInfoStandingTeam = {
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
  TeamAbbreviation: string;
  TeamID: string;
  Ties: string;
  UniqueID: string;
  Wins: string;
};

export type TeamInfoPlayer = {
  DateOfBirth: string;
  FirstName: string;
  JerseyNr: string;
  LastName: string;
  PersonID: string;
  PlayerAge: number;
  RoleID: number;
  RoleName: string;
};

export type TeamInfoGame = {
  AwayGoals: string;
  AwayTeamAbbreviation: string;
  AwayTeamID: string;
  FinishedType: string;
  GameDate: string;
  GameID: string;
  GameStatus: string;
  HomeGoals: string;
  HomeTeamAbbreviation: string;
  HomeTeamID: string;
  LevelID: string;
  ReportEnabled: boolean;
  StatGroupID: string;
};

export type TeamInfoContactPerson = {
  FirstName: string;
  LastName: string;
  RoleName: string;
};

export type TeamInfoAssociationTeam = {
  TeamID: string;
  TeamName: string;
};
