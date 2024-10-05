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

type SeasonsData = {
  [key: string]: PlayerSeasonData & {
    teams: string[];
  };
};

const PlayerRecentStats = ({ basicInfo, playerId }: PlayerRecentStatsProps) => {
  const [seasonsData] = useState<SeasonsData>({});
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
  }, []);

  useEffect(() => {
    if (recentSeasons && recentSeasons.length > 0) {
      const getData = async () => {
        const handledSeasons = new Set();

        recentSeasons.forEach(async (season) => {
          if (!handledSeasons.has(season.SeasonNumber)) {
            handledSeasons.add(season.SeasonNumber);
            const seasonData = await playerSeasonDataAction({
              playerId,
              age: basicInfo?.Age ?? "",
              season: season.SeasonNumber,
            });

            if (seasonData) {
              if (seasonData.IsSkaterStats && !seasonsData[season.SeasonName]) {
                seasonsData[season.SeasonName] = {
                  ...seasonData,
                  teams: season.LevelTeams.map((team) => team.TeamAbbrv),
                };

                setTotalPoints((oldValue) => ({
                  assists:
                    oldValue.assists + parseInt(seasonData.SkaterAssists),
                  games: oldValue.games + parseInt(seasonData.SkaterGames),
                  goals: oldValue.goals + parseInt(seasonData.SkaterGoals),
                  penaltyMinutes:
                    oldValue.penaltyMinutes +
                    parseInt(seasonData.SkaterPenaltyMinutes),
                  points: oldValue.points + parseInt(seasonData.SkaterPoints),
                }));
              }
            }
          }
        });
      };
      getData();
    }
  }, [recentSeasons]);

  const allSeasonsItems = Object.entries(seasonsData).map(
    ([seasonName, season]) => (
      <TableRow key={seasonName}>
        <Cell>Kausi {seasonName}</Cell>
        <Cell>{season.SkaterGames ?? 0}</Cell>
        <Cell>{season.SkaterGoals ?? 0}</Cell>
        <Cell>{season.SkaterAssists ?? 0}</Cell>
        <Cell>{season.SkaterPoints ?? 0}</Cell>
        <Cell>{season.SkaterPenaltyMinutes ?? 0}min</Cell>
        <Cell>{season.teams.join(", ")}</Cell>
      </TableRow>
    )
  );

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
            <Cell>Joukkueet</Cell>
          </TableTitleRow>
        </thead>
        <tbody>
          <TableRow className="border-b-2">
            <Cell className="font-semibold">Pisteet Uralla</Cell>
            <Cell className="font-semibold">{totalPoints.games}</Cell>
            <Cell className="font-semibold">{totalPoints.goals}</Cell>
            <Cell className="font-semibold">{totalPoints.assists}</Cell>
            <Cell className="font-semibold">{totalPoints.points}</Cell>
            <Cell className="font-semibold">
              {totalPoints.penaltyMinutes}min
            </Cell>
            <Cell> </Cell>
          </TableRow>
          {allSeasonsItems}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRecentStats;
