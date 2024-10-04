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

type PlayerTotalPoints = {
  goals: number;
  assists: number;
  games: number;
  penaltyMinutes: number;
  points: number;
};

const PlayerRecentStats = ({ basicInfo, playerId }: PlayerRecentStatsProps) => {
  const [seasonData, setSeasonData] = useState<PlayerSeasonData | null>();
  const [recentSeasons, setRecentSeasons] = useState<
    PlayerSeasonsDataInfo[] | null
  >([]);
  const [totalPoints, setTotalPoints] = useState<PlayerTotalPoints>({
    assists: 0,
    games: 0,
    goals: 0,
    penaltyMinutes: 0,
    points: 0,
  });

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

  // Calculate data from all seasons
  useEffect(() => {
    if (recentSeasons && recentSeasons.length > 0) {
      const getData = async () => {
        const handledSeasons = new Set();
        const allValues: PlayerTotalPoints = {
          assists: 0,
          games: 0,
          goals: 0,
          penaltyMinutes: 0,
          points: 0,
        };

        recentSeasons.forEach(async (season) => {
          if (!handledSeasons.has(season.SeasonNumber)) {
            handledSeasons.add(season.SeasonNumber);

            const seasonData = await playerSeasonDataAction({
              playerId,
              age: basicInfo?.Age ?? "",
              season: season.SeasonNumber,
            });

            if (seasonData && seasonData.IsSkaterStats) {
              const goals = parseInt(seasonData.SkaterGoals);
              const assists = parseInt(seasonData.SkaterAssists);
              const games = parseInt(seasonData.SkaterGames);
              const points = parseInt(seasonData.SkaterPoints);
              const penaltyMinutes = parseInt(seasonData.SkaterPenaltyMinutes);

              allValues.assists += assists;
              allValues.games += games;
              allValues.goals += goals;
              allValues.penaltyMinutes += penaltyMinutes;
              allValues.points += points;
            }
          }
        });
        setTotalPoints(allValues);
      };
      getData();
    }
  }, [recentSeasons]);

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
              Kausi{" "}
              {recentSeasons &&
                recentSeasons.length > 0 &&
                recentSeasons[0].SeasonName}
            </Cell>
            <Cell>{seasonData?.SkaterGames ?? 0}</Cell>
            <Cell>{seasonData?.SkaterGoals ?? 0}</Cell>
            <Cell>{seasonData?.SkaterAssists ?? 0}</Cell>
            <Cell>{seasonData?.SkaterPoints ?? 0}</Cell>
            <Cell>{seasonData?.SkaterPenaltyMinutes ?? 0}min</Cell>
          </TableRow>
          <TableRow>
            <Cell>Pisteet Uralla</Cell>
            <Cell>{totalPoints.games}</Cell>
            <Cell>{totalPoints.goals}</Cell>
            <Cell>{totalPoints.assists}</Cell>
            <Cell>{totalPoints.points}</Cell>
            <Cell>{totalPoints.penaltyMinutes}min</Cell>
          </TableRow>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRecentStats;
