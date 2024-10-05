import GamesTable from "@/components/GamesTable";
import PlayerTotalPoints from "@/components/PlayerStats/TotalPoints";
import Scoreboard from "@/components/Standings";

export const revalidate = 60;

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-col justify-evenly items-center pt-7 gap-4 large-desktop:flex-row large-desktop:items-start">
      <Scoreboard />
      <PlayerTotalPoints />
      <GamesTable header="Tulevat Ottelut" gameDays="incoming" />
    </div>
  );
};

export default Tulospalvelu;
