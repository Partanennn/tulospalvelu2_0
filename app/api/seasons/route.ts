import { GET_SEASONS_URL } from "../_lib/urls";

export async function GET() {
  const getSeasonsUrl = GET_SEASONS_URL;

  const resSeasons = await fetch(getSeasonsUrl, {
    method: "POST",
  });
  const seasons = await resSeasons.json();

  return Response.json(seasons);
}
