import { GET_STANDINGS_URL } from "../_lib/urls";

export async function POST(req: Request) {
  const url = GET_STANDINGS_URL;

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
}
