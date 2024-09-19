import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import { Group } from "@/utils/types";
import { ReactNode } from "react";
import "./globals.css";

export async function getGroups(
  season: string,
  levelId: string
): Promise<Group[]> {
  const url =
    "https://tulospalvelu.leijonat.fi/serie/helpers/getStatGroups.php";
  const body = new FormData();
  body.append("season", season);
  body.append("levelid", levelId);
  body.append("districtid", "");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return data;
}

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = async ({ children }: TulospalveluLayoutProps) => {
  const groups = await getGroups("2025", "101");

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
