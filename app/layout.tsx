import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import { Season } from "@/utils/types";
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

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = async ({ children }: TulospalveluLayoutProps) => {
  const seasons = await getSeasons();

  return (
    <html>
      <body>
        <LogoSlider />
        <NavBar seasons={seasons.map((value) => value.SeasonNumber)} />
        {children}
      </body>
    </html>
  );
};

export default TulospalveluLayout;
