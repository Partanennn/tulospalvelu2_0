import Games from "@/components/Games";
import SerieInfo from "@/components/SerieInfo";

const Otteluohjelma = () => {
  return (
    <div className="flex flex-col w-full justify-around items-center pt-7 ">
      <div className="flex flex-row my-5">
        <SerieInfo />
        <div>SÄÄNNÖT</div>
      </div>
      <Games />
    </div>
  );
};

export default Otteluohjelma;
