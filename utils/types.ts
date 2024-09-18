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

export interface Season {
  SeasonNumber: string;
  seasonName: string;
}

export interface Level {
  LevelID: string;
  LevelName: string;
}
