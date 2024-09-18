import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import { Level, Season } from "@/utils/types";
import { ReactNode } from "react";
import "./globals.css";

async function getSeasons(): Promise<Season[]> {
  const getSeasonsUrl =
    "https://tulospalvelu.leijonat.fi/helpers/getSeasons.php";

  const resSeasons = await fetch(getSeasonsUrl, {
    method: "POST",
  });
  const seasons = await resSeasons.json();
  return seasons;
}

async function getLevels(season: string): Promise<Level[]> {
  const url = "https://tulospalvelu.leijonat.fi/helpers/getLevels.php";

  const body = new FormData();
  body.append("season", season);
  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return data;
}

async function getGroups(season: string, levelId: string): Promise<any[]> {
  const url = "";

  return [];
}

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = async ({ children }: TulospalveluLayoutProps) => {
  const seasons = await getSeasons();
  const series = await getLevels("2025");

  return (
    <html>
      <body>
        <LogoSlider />
        <NavBar
          seasons={seasons.map((season) => season.SeasonNumber)}
          levels={series.map((serie) => serie.LevelName)}
        />
        {children}
      </body>
    </html>
  );
};

export default TulospalveluLayout;
