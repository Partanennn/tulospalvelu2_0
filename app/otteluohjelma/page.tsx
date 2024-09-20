import Games from "@/components/Games";
import { useGamesStore } from "@/stores/games-store";

const Otteluohjelma = () => {
  const { games } = useGamesStore();

  return (
    <div className="flex w-full justify-center">
      <Games />
    </div>
  );
};

export default Otteluohjelma;
