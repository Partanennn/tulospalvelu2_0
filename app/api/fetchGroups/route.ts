export const POST = async (req: Request) => {
  const url =
    "https://tulospalvelu.leijonat.fi/serie/helpers/getStatGroups.php";

  const reqBody = await req.json();

  const body = new FormData();
  body.append("season", reqBody.season);
  body.append("levelid", reqBody.levelId);
  body.append("districtid", "");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
