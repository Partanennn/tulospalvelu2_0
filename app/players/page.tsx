import PlayerGoalScorers from "@/components/Players/PlayerGoalScorers";
import PlayerPenaltyStats from "@/components/Players/PlayerPenaltyStats";
import PlayerTotalPoints from "@/components/Players/PlayerTotalPoints";

const PlayersPage = () => {
  return (
    <div className="flex flex-col 2xl:flex-row justify-center items-center 2xl:items-start gap-5">
      <PlayerTotalPoints />
      <PlayerPenaltyStats />
      <PlayerGoalScorers />
    </div>
  );
};

export default PlayersPage;
