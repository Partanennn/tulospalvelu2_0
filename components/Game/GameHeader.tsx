"use client";

import { IMAGE_URL } from "@/app/_lib/urls";
import MyImage from "../MyImage";

type GameHeaderProps = {
  awayName: string;
  awayLogoUrl: string;
  awayScore: number;
  homeLogoUrl: string;
  homeName: string;
  homeScore: number;
};

const GameHeader = ({
  awayLogoUrl,
  awayName,
  awayScore,
  homeLogoUrl,
  homeName,
  homeScore,
}: GameHeaderProps) => {
  const isHomeWinner = homeScore > awayScore;
  const awayScoreColor = isHomeWinner ? "text-neutral-900" : "text-black";
  const homeScoreColor = isHomeWinner ? "text-black" : "text-neutral-900";

  return (
    <div className="flex flex-row gap-10 items-center p-4">
      <MyImage src={`${IMAGE_URL}/${homeLogoUrl}`} alt={homeName} />
      <div className="font-semibold text-heading2">{homeName}</div>
      <div className={`font-semibold text-heading1 ${homeScoreColor}`}>
        {homeScore}
      </div>
      <div>Lopullinen</div>
      <div className={`font-semibold text-heading1 ${awayScoreColor}`}>
        {awayScore}
      </div>
      <div className="font-semibold text-heading2">{awayName}</div>
      <MyImage src={`${IMAGE_URL}/${awayLogoUrl}`} alt={awayName} />
    </div>
  );
};

export default GameHeader;
