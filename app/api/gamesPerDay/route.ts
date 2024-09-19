export type GameDay = {};

export const POST = async (req: Request) => {
  const url = "https://tulospalvelu.leijonat.fi/helpers/getGames.php";

  const reqBody = await req.json();

  const body = new FormData();
  body.append("dwl", "0");
  body.append("season", reqBody.season);
  body.append("stgid", reqBody.stgid);
  body.append("teamid", "0");
  body.append("districtid", "0");
  body.append("gamedays", "3");
  body.append("dog", "2024-09-19");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
