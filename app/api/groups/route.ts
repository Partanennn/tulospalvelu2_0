import { GET_STAT_GROUP_URL } from "../_lib/urls";

export const POST = async (req: Request) => {
  const url = GET_STAT_GROUP_URL;

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
