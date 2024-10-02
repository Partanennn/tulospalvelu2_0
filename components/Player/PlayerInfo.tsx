"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PlayerBasicInfo,
  playerBasicInfoAction,
} from "@/app/_actions/playerBasicInfoAction";
import MyImage from "../MyImage";
import BasicInfo from "./PlayerBasicInfo";
import PlayerAllSeasonsStats from "./PlayerAllSeasonsStats";

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
      {basicInfo !== undefined && (
        <MyImage
          alt={`${basicInfo?.FirstName} ${basicInfo?.LastName}`}
          src={basicInfo?.PlayerIMG ?? ""}
          width={100}
        />
      )}

      <div>
        <p className="font-semibold">
          {basicInfo?.FirstName} {basicInfo?.LastName}
        </p>
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
