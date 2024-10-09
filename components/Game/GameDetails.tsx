"use client";

import { GameReport, getGameDataAction } from "@/app/_actions/gameDataAction";
import { getPeriodLengthFromRuleString } from "@/utils/helpers";
import { useEffect, useState } from "react";
import GameBoxScore from "./GameBoxScore";
import GameEvents from "./GameEvents";
import GameHeader from "./GameHeader";

type GameDetailsProps = {
  gameId: string;
};

const GameDetails = ({ gameId }: GameDetailsProps) => {
  const [game, setGame] = useState<GameReport | null>(null);

  useEffect(() => {
    if (gameId) {
      const getData = async () => {
        const data = await getGameDataAction({ gameId });

        setGame(data);
      };

      getData();
    }
  }, [gameId]);
  return (
    <div className="flex flex-col justify-center items-center">
      {game && (
        <div>
          <GameHeader
            gameInfo={game.GamesUpdate[0]}
            awayTeam={game.GamesUpdate[0].AwayTeam}
            homeTeam={game.GamesUpdate[0].HomeTeam}
          />
          <div className="flex flex-row">
            <GameEvents
              gameEvents={game.GameLogsUpdate}
              homeTeam={game.GamesUpdate[0].HomeTeam}
              awayTeam={game.GamesUpdate[0].AwayTeam}
              periodLength={getPeriodLengthFromRuleString(
                game.GamesUpdate[0].GameRules
              )}
            />
            <GameBoxScore />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
