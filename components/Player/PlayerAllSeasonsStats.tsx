import { useEffect, useState } from "react";
import Cell from "../Table/Cell";
import TableRow from "../Table/TableRow";
import TableTitleRow from "../Table/TableTitleRow";
import { useSeasonStore } from "@/stores/season-store";
import {
  playerSeasoDataAction,
  PlayerSeasonData,
} from "@/app/_actions/playerSeasonDataAction";
import { PlayerBasicInfo } from "@/app/_actions/playerBasicInfoAction";

type PlayerRecentStatsProps = {
  basicInfo: PlayerBasicInfo | null;
  playerId: string;
};

const PlayerRecentStats = ({ basicInfo, playerId }: PlayerRecentStatsProps) => {
  const [data, setData] = useState<PlayerSeasonData | null>();

  const { seasons } = useSeasonStore();

  useEffect(() => {
    if (basicInfo && playerId && seasons) {
      const getData = async () => {
        const result = await playerSeasoDataAction({
          age: basicInfo?.Age ?? "",
          playerId: playerId,
          season: "2025",
        });
        console.log({
          age: basicInfo?.Age,
          playerId,
          season: seasons,
        });
        setData(result);
      };
      getData();
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
            <Cell>Vaihdot</Cell>
          </TableTitleRow>
        </thead>
        <tbody>
          <TableRow>
            <Cell>2023-2024 Season</Cell>
            <Cell>{data?.SkaterGames ?? 0}</Cell>
            <Cell>{data?.SkaterGoals ?? 0}</Cell>
            <Cell>{data?.SkaterAssists ?? 0}</Cell>
            <Cell>{data?.SkaterPoints ?? 0}</Cell>
            <Cell>{data?.Skaterhifts ?? 0}</Cell>
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
