import { GET_TEAM_STATS_URL } from "../_lib/urls";

export type TeamStatsSortedBy = "TeamPoints" | "TeamPenaltyMin" | "";
export type TeamStatsTotal = "avg" | "";
export type TeamStatsSortOrder = "DESC" | "ASC";
export type TeamStatsGames = "Home" | "Away" | "";
export type TeamStatsPeriod = "1st" | "2nd" | "3rd" | "OT" | "";

export const POST = async (req: Request) => {
  const url = GET_TEAM_STATS_URL;

  const reqBody = await req.json();

  const body = new FormData();

  body.append("season", reqBody.season);
  body.append("stgid", reqBody.stgid);
  body.append("filters[Games]", "");
  body.append("filters[Strength]", "");
  body.append("filters[Rookies]", "0");
  body.append("filters[Total]", reqBody.total ?? ""); // avg
  body.append("filters[Period]", reqBody.period ?? "");
  body.append("filters[SortOrder]", reqBody.sortOrder ?? "DESC");
  body.append("filters[SortedBy]", reqBody.sortedBy ?? "TeamPoints");
  body.append("filters[Sport]", "0");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });
  const data = await res.json();

  return Response.json(data);
};
