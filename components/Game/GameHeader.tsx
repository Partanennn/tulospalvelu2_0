"use client";

import { GameReportGamesUpdate } from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import {
  calculatePeriodMinutesAndSeconds,
  getPeriodLengthFromRuleString,
} from "@/utils/helpers";
import MyImage from "../MyImage";

type GameHeaderProps = {
  awayName: string;
  awayLogoUrl: string;
  awayScore: number;
  gameInfo: GameReportGamesUpdate;
  homeLogoUrl: string;
  homeName: string;
  homeScore: number;
};

const GameHeader = ({
  awayLogoUrl,
  awayName,
  awayScore,
  gameInfo,
  homeLogoUrl,
  homeName,
  homeScore,
}: GameHeaderProps) => {
  const isHomeWinner = homeScore > awayScore;
  const awayScoreColor = isHomeWinner ? "text-neutral-900" : "text-black";
  const homeScoreColor = isHomeWinner ? "text-black" : "text-neutral-900";
  const periodLength = getPeriodLengthFromRuleString(gameInfo.GameRules);
  const currentPeriod = Math.ceil(gameInfo.GameTime / (periodLength * 60));
  const { minutes, seconds } = calculatePeriodMinutesAndSeconds(
    gameInfo.GameTime,
    periodLength,
    currentPeriod
  );

  return (
    <div className="flex flex-row gap-10 items-center p-4">
      <MyImage src={`${IMAGE_URL}/${homeLogoUrl}`} alt={homeName} />
      <div className="font-semibold text-heading2">{homeName}</div>
      <div className={`font-semibold text-heading1 ${homeScoreColor}`}>
        {homeScore}
      </div>

      {gameInfo.FinishedType === 1 ? (
        <div>Lopullinen</div>
      ) : (
        <div className="flex flex-col justify-center items-center text-heading6">
          <div>
            {Math.floor(gameInfo.GameTime / 60)}:{seconds}
          </div>
        </div>
      )}

      <div className={`font-semibold text-heading1 ${awayScoreColor}`}>
        {awayScore}
      </div>
      <div className="font-semibold text-heading2">{awayName}</div>
      <MyImage src={`${IMAGE_URL}/${awayLogoUrl}`} alt={awayName} />
    </div>
  );
};

export default GameHeader;
