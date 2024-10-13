"use client";

import {
  GameReportGamesUpdate,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import {
  calculatePeriodMinutesAndSeconds,
  getPeriodLengthFromRuleString,
} from "@/utils/helpers";
import { useRouter } from "next/navigation";
import MyImage from "../MyImage";

type GameHeaderProps = {
  gameInfo: GameReportGamesUpdate;
  awayTeam: GameReportGamesUpdateTeam;
  homeTeam: GameReportGamesUpdateTeam;
};

const GameHeader = ({ awayTeam, gameInfo, homeTeam }: GameHeaderProps) => {
  const isHomeWinner = homeTeam.Goals > awayTeam.Goals;
  const awayScoreColor = isHomeWinner ? "text-neutral-900" : "text-black";
  const homeScoreColor = isHomeWinner ? "text-black" : "text-neutral-900";

  const router = useRouter();

  const periodLength = getPeriodLengthFromRuleString(gameInfo.GameRules);
  const currentPeriod = Math.ceil(gameInfo.GameTime / (periodLength * 60));
  const { seconds } = calculatePeriodMinutesAndSeconds(
    gameInfo.GameTime,
    periodLength,
    currentPeriod
  );

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-row justify-center items-center gap-5">
        <MyImage
          src={`${IMAGE_URL}/${homeTeam.Image}`}
          alt={homeTeam.Name}
          onClick={() => router.push(`/team/${homeTeam.Id}`)}
          className="hover:cursor-pointer"
        />
        <div
          className="font-semibold text-heading6 hover:cursor-pointer xl:text-heading2"
          onClick={() => router.push(`/team/${homeTeam.Id}`)}
        >
          {homeTeam.Name}
        </div>
        <div
          className={`font-semibold text-heading4 hover:cursor-pointer xl:text-heading1 ${homeScoreColor}`}
          onClick={() => router.push(`/team/${homeTeam.Id}`)}
        >
          {homeTeam.Goals}
        </div>
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

      <div className="flex flex-row-reverse justify-center items-center gap-5">
        <div
          className={`font-semibold text-heading4 hover:cursor-pointer xl:text-heading1 ${awayScoreColor} `}
          onClick={() => router.push(`/team/${awayTeam.Id}`)}
        >
          {awayTeam.Goals}
        </div>
        <div
          className="font-semibold text-heading6 hover:cursor-pointer xl:text-heading2"
          onClick={() => router.push(`/team/${awayTeam.Id}`)}
        >
          {awayTeam.Name}
        </div>
        <MyImage
          src={`${IMAGE_URL}/${awayTeam.Image}`}
          className="hover:cursor-pointer"
          onClick={() => router.push(`/team/${awayTeam.Id}`)}
          alt={awayTeam.Name}
        />
      </div>
    </div>
  );
};

export default GameHeader;
