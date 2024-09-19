export interface Level {
  LevelID: string;
  LevelName: string;
}

export async function POST(req: Request) {
  const url = "https://tulospalvelu.leijonat.fi/helpers/getLevels.php";

  const season = await req.json();

  const body = new FormData();
  body.append("season", season);
  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
}
