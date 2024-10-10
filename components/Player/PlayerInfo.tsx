"use client";

import {
  PlayerBasicInfo,
  playerBasicInfoAction,
} from "@/app/_actions/playerBasicInfoAction";
import { PLAYER_EXTERNAL_URL } from "@/app/_lib/urls";
import { useEffect, useState } from "react";
import MyImage from "../MyImage";
import PlayerAllSeasonsStats from "./PlayerAllSeasonsStats";
import BasicInfo from "./PlayerBasicInfo";

type PlayerInfoProps = {
  playerId: string;
};

const PlayerInfo = ({ playerId }: PlayerInfoProps) => {
  const [basicInfo, setBasicInfo] = useState<PlayerBasicInfo | null>(null);

  useEffect(() => {
    if (playerId) {
      const fetchData = async () => {
        const data = await playerBasicInfoAction({
          playerId: playerId ?? "",
        });

        if (data) {
          setBasicInfo(data);
        }
      };
      fetchData();
    }
  }, [playerId]);

  return (
    <div className="flex flex-col gap-5 items-center">
      {basicInfo !== undefined && basicInfo?.PlayerIMG && (
        <MyImage
          alt={`${basicInfo?.FirstName} ${basicInfo?.LastName}`}
          src={basicInfo.PlayerIMG}
          width={100}
        />
      )}

      <div>
        <a href={`${PLAYER_EXTERNAL_URL}${playerId}`}>
          <p className="font-semibold">
            {basicInfo?.FirstName} {basicInfo?.LastName}
          </p>
        </a>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start gap-5 md:flex-row">
        <BasicInfo basicInfo={basicInfo} />
        <PlayerAllSeasonsStats
          basicInfo={basicInfo}
          playerId={playerId ?? ""}
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
