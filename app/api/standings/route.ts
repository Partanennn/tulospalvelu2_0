import { StandingTeam } from "@/utils/types";

export type Standings = {
  StandingLines: string[]; // ?
  StdRankingType: string;
  Teams: StandingTeam[];
  WinPoints: number;
};

export const POST = async (req: Request) => {
  const url = "https://tulospalvelu.leijonat.fi/serie/helpers/getStandings.php";
  const reqBody = await req.json();

  const body = new FormData();
  body.append("season", reqBody.season);
  body.append("stgid", reqBody.stgid);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
