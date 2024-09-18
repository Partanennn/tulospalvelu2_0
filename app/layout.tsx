import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import { ReactNode } from "react";
import "./globals.css";

/* async function getGroupTeams(): Promise<string> {
  const getSeasonsUrl =
    "https://tulospalvelu.leijonat.fi/helpers/getSeasons.php";

  const body = new FormData();
  body.append("", "");

  const resSeasons = await fetch(getSeasonsUrl, {
    method: "POST",
  });
  const seasons = resSeasons.json();

  return seasons;
} */

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = ({ children }: TulospalveluLayoutProps) => {
  return (
    <html>
      <body>
        <LogoSlider />
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default TulospalveluLayout;
