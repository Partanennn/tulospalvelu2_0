"use client";

import {
  PlayerBasicInfo,
  playerBasicInfoAction,
} from "@/app/_actions/playerBasicInfoAction";
import { PLAYER_EXTERNAL_URL } from "@/app/api/_lib/urls";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyImage from "../MyImage";
import PlayerAllSeasonsStats from "./PlayerAllSeasonsStats";
import BasicInfo from "./PlayerBasicInfo";

const PlayerInfo = () => {
  const [basicInfo, setBasicInfo] = useState<PlayerBasicInfo | null>(null);
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("playerid")) {
      const fetchData = async () => {
        const playerId = params.get("playerid");

        const data = await playerBasicInfoAction({
          playerId: playerId ?? "",
        });

        if (data) {
          setBasicInfo(data);
        }
      };
      fetchData();
    }
  }, [params]);

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
        <a href={`${PLAYER_EXTERNAL_URL}${params.get("playerid")}`}>
          <p className="font-semibold">
            {basicInfo?.FirstName} {basicInfo?.LastName}
          </p>
        </a>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start gap-5 md:flex-row">
        <BasicInfo basicInfo={basicInfo} />
        <PlayerAllSeasonsStats
          basicInfo={basicInfo}
          playerId={params.get("playerid") ?? ""}
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
