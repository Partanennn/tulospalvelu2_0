"use server";

import { Season } from "@/stores/season-store";
import { GET_PLAYER_STATS_URL } from "../api/_lib/urls";
import { Group } from "@/stores/group-store";

export type PlayerStatsSortedBy =
  | "PlayerPoints"
  | "PlayerPenaltyMin"
  | "PlayerGoals"
  | "";
export type PlayerStatsTotal = "avg" | "";
export type PlayerStatsSortOrder = "DESC" | "ASC";
export type PlayerStatsGames = "Home" | "Away" | "";
export type PlayerStatsPeriod = "1st" | "2nd" | "3rd" | "OT" | "";
export type PlayerStatsStrength = "EQ" | "PP" | "SH" | "";
export type PlayerStatsRoleId =
  | "-1" /* ALL */
  | "21" /* SKATERS */
  | "18" /* DEFENCEMEN */
  | "19" /* FORWARDS */
  | "1"; /* GOALIES */

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

type PlayerStatsProps = {
  season: Season;
  group: Group;
  numberOfPlayers?: number;
  games?: PlayerStatsGames;
  strength?: PlayerStatsStrength;
  rookies?: "1" | "0";
  period?: PlayerStatsPeriod;
  playerName?: string;
  sortOrder?: PlayerStatsSortOrder;
  sortedBy?: PlayerStatsSortedBy;
  teamId?: string;
  total?: PlayerStatsTotal;
  roleId?: string;
};

export const playerStatsAction = async ({
  group,
  season,
  games = "",
  numberOfPlayers = 10,
  period = "",
  playerName = "",
  roleId = "-1",
  rookies = "0",
  sortOrder = "DESC",
  sortedBy = "PlayerPoints",
  strength = "",
  teamId = "",
  total = "",
}: PlayerStatsProps): Promise<PlayerStatsBase | null> => {
  const url = GET_PLAYER_STATS_URL;

  const body = new FormData();

  body.append("season", season.SeasonNumber); // REQUIRED
  body.append("type", "1");
  body.append("teamid", teamId);
  body.append("nop", numberOfPlayers.toString());
  body.append("filters[Games]", games);
  body.append("filters[Strength]", strength);
  body.append("filters[Rookies]", rookies);
  body.append("filters[Total]", total);
  body.append("filters[Period]", period);
  body.append("filters[SortOrder]", sortOrder);
  body.append("filters[SortedBy]", sortedBy);
  body.append("filters[Sport]", "0");
  body.append("filters[PlayerName]", playerName);
  body.append("filters[RoleID]", roleId);
  body.append("stgid", group.StatGroupID); // REQUIRED

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });
  const data: PlayerStatsBase | null = await res.json();

  return data;
};
