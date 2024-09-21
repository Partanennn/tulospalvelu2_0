import { GET_LEVELS_URL } from "../_lib/urls";

export interface Level {
  LevelID: string;
  LevelName: string;
}

export const POST = async (req: Request) => {
  const url = GET_LEVELS_URL;

  const season = await req.json();

  const body = new FormData();
  body.append("season", season);
  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
