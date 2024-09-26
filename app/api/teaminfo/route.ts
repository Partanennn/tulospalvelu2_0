import { GET_TEAM_INFO_URL } from "../_lib/urls";

export const POST = async (req: Request) => {
  const url = GET_TEAM_INFO_URL;
  const reqBody = await req.json();

  const body = new FormData();
  body.append("teamid", reqBody.teamId);
  body.append("seasonnumber", reqBody.seasonNumber);
  body.append("associationid", reqBody.associationId);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
