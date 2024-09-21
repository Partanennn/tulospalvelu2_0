import { Game } from "@/stores/games-store";
import { GET_GAMES_URL } from "../_lib/urls";

export type GameDay = {
  GameDates: any[];
  Games: Game[];
  LevelID: string;
  LevelName: string;
  PlayOffPhases: any[];
  PlayOffTeams: any[];
  WebOrder: string;
};

export const POST = async (req: Request) => {
  const url = GET_GAMES_URL;

  const reqBody = await req.json();

  const body = new FormData();

  if (reqBody.gameDays === "future") {
    body.append("gamedays", "2");
  } else if (reqBody.gameDays === "played") {
    body.append("gamedays", "1");
  } else {
    // All games
    body.append("gamedays", "3");
  }

  body.append("dwl", "0");
  body.append("season", reqBody.season);
  body.append("stgid", reqBody.stgid);
  body.append("teamid", "0");
  body.append("districtid", "0");
  body.append("dog", "2024-09-20");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
