import GamesToday from "@/components/GamesToday";
import Scoreboard from "@/components/Standings";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-col justify-evenly pt-7 gap-4 2xl:flex-row">
      <Scoreboard />
      <GamesToday />
      <p>Pistepörssi</p>
    </div>
  );
};

export default Tulospalvelu;
