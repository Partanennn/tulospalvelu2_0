import GamesToday from "@/components/Games/GamesToday";
import PlayerStats from "@/components/Players/PlayerStats";
import Scoreboard from "@/components/Standings";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-col justify-evenly items-center pt-7 gap-4 2xl:flex-row 2xl:items-start">
      <Scoreboard />
      <GamesToday />
      <PlayerStats />
    </div>
  );
};

export default Tulospalvelu;
