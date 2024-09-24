import PlayerGoalScorers from "@/components/Players/PlayerGoalScorers";
import PlayerPenaltyStats from "@/components/Players/PlayerPenaltyStats";
import PlayerStats from "@/components/Players/PlayerStats";

const PlayersPage = () => {
  return (
    <div className="flex flex-col 2xl:flex-row justify-center items-center 2xl:items-start gap-5">
      <PlayerStats />
      <PlayerPenaltyStats />
      <PlayerGoalScorers />
    </div>
  );
};

export default PlayersPage;
