import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import Layout from "./layout";

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

const Tulospalvelu = async () => {
  //const data = await getGroupTeams();
  return (
    <Layout>
      <LogoSlider />
      <NavBar />
    </Layout>
  );
};

export default Tulospalvelu;
