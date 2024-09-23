import Games from "@/components/Games/Games";
import GamesToday from "@/components/Games/GamesToday";
import IncomingGames from "@/components/Games/IncomingGames";

const MatchesPage = () => {
  return (
    <div className="flex flex-col items-center 2xl:flex-row 2xl:items-start justify-around pt-7 gap-3">
      <GamesToday />
      <Games />
      <IncomingGames />
    </div>
  );
};

export default MatchesPage;
