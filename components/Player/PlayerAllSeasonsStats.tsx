import { PlayerBasicInfo } from "@/app/_actions/playerBasicInfoAction";
import {
  PlayerSeasonData,
  playerSeasonDataAction,
} from "@/app/_actions/playerSeasonDataAction";
import {
  playerSeasonsDataAction,
  PlayerSeasonsDataInfo,
} from "@/app/_actions/playerSeasonsDataAction";
import { useEffect, useState } from "react";
import Cell from "../Table/Cell";
import TableRow from "../Table/TableRow";
import TableTitleRow from "../Table/TableTitleRow";

type PlayerRecentStatsProps = {
  basicInfo: PlayerBasicInfo | null;
  playerId: string;
};

const PlayerRecentStats = ({ basicInfo, playerId }: PlayerRecentStatsProps) => {
  const [seasonData, setSeasonData] = useState<PlayerSeasonData | null>();
  const [recentSeasons, setRecentSeasons] = useState<
    PlayerSeasonsDataInfo[] | null
  >([]);

  useEffect(() => {
    if (basicInfo && playerId && recentSeasons && recentSeasons?.length > 0) {
      const getSeasonData = async () => {
        const result = await playerSeasonDataAction({
          age: basicInfo?.Age ?? "",
          playerId: playerId,
          season: recentSeasons[0].SeasonNumber,
        });

        setSeasonData(result);
      };

      getSeasonData();
    }
  }, [playerId, basicInfo]);

  useEffect(() => {
    if (playerId) {
      const getRecentSeasonData = async () => {
        const result = await playerSeasonsDataAction({ playerId });

        if (result) {
          if (result.Skater && result.Skater.length > 0) {
            setRecentSeasons(result.Skater);
          } else if (result.GoalKeeper && result.GoalKeeper.length > 0) {
            setRecentSeasons(result.GoalKeeper);
          }
        }
      };

      getRecentSeasonData();
    }
  }, [playerId]);

  return (
    <div>
      <table>
        <thead>
          <TableTitleRow>
            <Cell> </Cell>
            <Cell>O</Cell>
            <Cell>M</Cell>
            <Cell>S</Cell>
            <Cell>P</Cell>
            <Cell>JM</Cell>
          </TableTitleRow>
        </thead>
        <tbody>
          <TableRow>
            <Cell>
              {recentSeasons &&
                recentSeasons.length > 0 &&
                recentSeasons[0].SeasonName}{" "}
              Season
            </Cell>
            <Cell>{seasonData?.SkaterGames ?? 0}</Cell>
            <Cell>{seasonData?.SkaterGoals ?? 0}</Cell>
            <Cell>{seasonData?.SkaterAssists ?? 0}</Cell>
            <Cell>{seasonData?.SkaterPoints ?? 0}</Cell>
            <Cell>{seasonData?.SkaterPenaltyMinutes ?? 0}min</Cell>
          </TableRow>
          <TableRow>
            <Cell>Pisteet Uralla</Cell>
            <Cell>Season</Cell>
            <Cell>Season</Cell>
            <Cell>Season</Cell>
            <Cell>Season</Cell>
            <Cell>Season</Cell>
          </TableRow>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRecentStats;
