import GamesTable from "@/components/GamesTable";
import PlayerTotalPoints from "@/components/Players/PlayerTotalPoints";
import Scoreboard from "@/components/Standings";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-col flex-wrap justify-evenly items-center pt-7 gap-4 2xl:flex-row 2xl:items-start">
      <Scoreboard />
      <PlayerTotalPoints />
      <GamesTable header="Tulevat Ottelut" gameDays="incoming" />
    </div>
  );
};

export default Tulospalvelu;
