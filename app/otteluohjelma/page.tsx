import Games from "@/components/Games";
import SerieInfo from "@/components/SerieInfo";

const Otteluohjelma = () => {
  return (
    <div className="flex sm:flex-col md:felx-row  w-full justify-around pt-7 ">
      <Games />
      <SerieInfo />
      <h1>SÄÄNNÖT</h1>
    </div>
  );
};

export default Otteluohjelma;
