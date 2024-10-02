"use server";

import { PLAYER_ALL_STATS_URL } from "../api/_lib/urls";

export type PlayerSeasonData = {
  GameLength: string;
  GoalieGas: string;
  GoalieGames: string;
  GoalieGoalsAgainst: string;
  GoalieLosses: string;
  GoaliePenaltyMinutes: string;
  GoaliePlayedGames: string;
  GoaliePoints: string;
  GoalieToi: string;
  GoalieWins: string;
  GoalieZeroGames: string;
  HasTimeOnIce: string;
  HasWinningShots: string;
  IsGoalieStats: string;
  IsSkaterStats: string;
  SeasonTeams: PlayerSeasonDataSeasonTeam[];
  SkaterAssists: string;
  SkaterGames: string;
  SkaterGoals: string;
  SkaterGoalsPP: string;
  SkaterGoalsSH: string;
  SkaterGoalsWS: string;
  SkaterPenaltyMinutes: string;
  SkaterPoints: string;
  Skaterhifts: string;
  SkaterShiftsAvg: string;
  SkaterToi: string;
  SkaterToiAvg: string;
};

type PlayerSeasonDataSeasonTeam = {
  LevelName: string;
  Teams: PlayerSeasonDataSeasonTeamTeam;
};

type PlayerSeasonDataSeasonTeamTeam = {
  // TeamID index 0, TeamName index 0 are connected
  TeamID: string[];
  TeamName: string[];
};

type PlayerSeasonInfoProps = {
  playerId: string;
  age: string;
  season: string;
};

export const playerSeasoDataAction = async ({
  playerId,
  age,
  season,
}: PlayerSeasonInfoProps): Promise<PlayerSeasonData | null> => {
  const url = `${PLAYER_ALL_STATS_URL}${playerId}&age=${age}&season=${season}`;

  const res = await fetch(url, {
    method: "POST",
  });

  const data: PlayerSeasonData | null = await res.json();

  return data;
};
