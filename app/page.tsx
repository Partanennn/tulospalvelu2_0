import LogoSlider from "@/components/LogoSlider";
import TulospalveluLayout from "./layout";
import NavBar from "@/components/Navbar";
import Layout from "./layout";

async function getGroupTeams() {
  const url = "https://google.com";
  const body = new FormData();
  body.append("", "");
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  //const data = res.text();
  return res;
}

const Tulospalvelu = async () => {
  const data = getGroupTeams();
  console.log(data);
  return (
    <Layout>
      <LogoSlider />
      <NavBar />
    </Layout>
  );
};

export default Tulospalvelu;
