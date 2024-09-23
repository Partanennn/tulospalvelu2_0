import { GET_PLAYER_STATS_URL } from "../_lib/urls";

export type PlayerStatsSortedBy = "PlayerPoints" | "PlayerPenaltyMin" | "";
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

export const POST = async (req: Request) => {
  const url = GET_PLAYER_STATS_URL;

  const reqBody = await req.json();

  const body = new FormData();

  body.append("season", reqBody.season); // REQUIRED
  body.append("type", "1");
  body.append("teamid", "");
  body.append("nop", reqBody.nop ?? "10");
  body.append("filters[Games]", reqBody.games ?? "");
  body.append("filters[Strength]", reqBody.strength ?? "");
  body.append("filters[Rookies]", reqBody.rookies ?? "0");
  body.append("filters[Total]", reqBody.total ?? "");
  body.append("filters[Period]", reqBody.period ?? "");
  body.append("filters[SortOrder]", reqBody.sortOrder ?? "DESC");
  body.append("filters[SortedBy]", reqBody.sortedBy ?? "PlayerPoints");
  body.append("filters[Sport]", "0");
  body.append("filters[PlayerName]", "");
  body.append("filters[RoleID]", reqBody.roleid ?? "-1");
  body.append("stgid", reqBody.stgid); // REQUIRED

  console.log(body);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: body,
    });
    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ message: `Error: ${error}` }, { status: 500 });
  }
};
