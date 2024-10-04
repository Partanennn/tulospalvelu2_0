import { PlayerBasicInfo } from "@/app/_actions/playerBasicInfoAction";
import {
  playerSeasoDataAction,
  PlayerSeasonData,
} from "@/app/_actions/playerSeasonDataAction";
import { useSeasonStore } from "@/stores/season-store";
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

  const { seasons } = useSeasonStore();

  useEffect(() => {
    if (basicInfo && playerId && seasons) {
      const getSeasonData = async () => {
        const result = await playerSeasoDataAction({
          age: basicInfo?.Age ?? "",
          playerId: playerId,
          season: "2025",
        });
        setSeasonData(result);
      };
      getSeasonData();
    }
  }, [playerId, basicInfo]);

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
            <Cell>2023-2024 Season</Cell>
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
