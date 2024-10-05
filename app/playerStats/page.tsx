import GoalScorers from "@/components/PlayerStats/GoalScorers";
import PenaltyStats from "@/components/PlayerStats/PenaltyStats";
import TotalPoints from "@/components/PlayerStats/TotalPoints";

const PlayersPage = () => {
  return (
    <div className="flex flex-col 2xl:flex-row justify-center items-center 2xl:items-start gap-5">
      <TotalPoints />
      <PenaltyStats />
      <GoalScorers />
    </div>
  );
};

export default PlayersPage;
