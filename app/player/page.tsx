import PlayerInfo from "@/components/Player/PlayerInfo";
import { Suspense } from "react";

const PlayerPage = () => {
  return (
    <div className="flex justify-center">
      <Suspense>
        <PlayerInfo />
      </Suspense>
    </div>
  );
};

export default PlayerPage;
