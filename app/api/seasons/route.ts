export type Season = {
  SeasonNumber: string;
  SeasonName: string;
};

export async function GET() {
  const getSeasonsUrl =
    "https://tulospalvelu.leijonat.fi/helpers/getSeasons.php";

  const resSeasons = await fetch(getSeasonsUrl, {
    method: "POST",
  });
  const seasons = await resSeasons.json();

  return Response.json(seasons);
}
