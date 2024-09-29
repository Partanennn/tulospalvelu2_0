"use server";

import { TeamStats } from "@/stores/team-stats-store";
import { GET_TEAM_STATS_URL } from "../api/_lib/urls";

type TeamStatsSortedBy = "TeamPoints" | "TeamPenaltyMin" | "";
type TeamStatsTotal = "avg" | "";
type TeamStatsSortOrder = "DESC" | "ASC";
type TeamStatsGames = "Home" | "Away" | "";
type TeamStatsPeriod = "1st" | "2nd" | "3rd" | "OT" | "";

type TeamStatsProps = {
  groupId: string;
  seasonId: string;
  games?: TeamStatsGames;
  period?: TeamStatsPeriod;
  rookies?: "1" | "0";
  sortOrder?: TeamStatsSortOrder;
  sortedBy?: TeamStatsSortedBy;
  total?: TeamStatsTotal;
};

export const getTeamStats = async ({
  groupId,
  seasonId,
  games = "",
  period = "",
  rookies = "0",
  sortOrder = "DESC",
  sortedBy = "TeamPoints",
  total = "",
}: TeamStatsProps): Promise<TeamStats | null> => {
  const url = GET_TEAM_STATS_URL;

  const body = new FormData();

  body.append("season", seasonId);
  body.append("stgid", groupId);
  body.append("filters[Games]", games);
  body.append("filters[Strength]", "");
  body.append("filters[Rookies]", rookies);
  body.append("filters[Total]", total); // avg
  body.append("filters[Period]", period);
  body.append("filters[SortOrder]", sortOrder);
  body.append("filters[SortedBy]", sortedBy);
  body.append("filters[Sport]", "0");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data: TeamStats | null = await res.json();

  return data;
};
