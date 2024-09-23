import PlayerGoalScorers from "@/components/Players/PlayerGoalScorers";
import PlayerPenaltyStats from "@/components/Players/PlayerPenaltyStats";
import PlayerStats from "@/components/Players/PlayerStats";

const PlayersPage = () => {
  return (
    <div className="flex justify-center gap-5">
      <PlayerStats />
      <PlayerPenaltyStats />
      <PlayerGoalScorers />
    </div>
  );
};

export default PlayersPage;
