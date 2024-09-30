"use client";

import { useSeasonStore } from "@/stores/season-store";
import { Team, useTeamStatsStore } from "@/stores/team-stats-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cell from "./Table/Cell";
import TableHeader from "./Table/TableHeader";
import TableHeaderRow from "./Table/TableHeaderRow";

const Standings = () => {
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const router = useRouter();

  const { teamStats } = useTeamStatsStore();
  const { selectedSeason } = useSeasonStore();

  useEffect(() => {
    if (teamStats) {
      setTeamsData([...teamStats.Teams]);
    }
  }, [teamStats]);

  const sortFunc = (a: Team, b: Team) => {
    if (a.TeamPoints !== b.TeamPoints) {
      return b.TeamPoints - a.TeamPoints;
    }

    if (a.TeamGoalDiff !== b.TeamGoalDiff) {
      return b.TeamGoalDiff - a.TeamGoalDiff;
    }

    if (a.TeamGoalsFor !== b.TeamGoalsFor) {
      return b.TeamGoalsFor - a.TeamGoalsFor;
    }

    return a.TeamAbbrv.localeCompare(b.TeamAbbrv);
  };

  const teams = teamsData.sort(sortFunc).map((team, index) => (
    <tr
      key={team.TeamID}
      className="odd:bg-neutral-300 hover:cursor-pointer"
      style={{
        borderBottom: teamStats?.StandingLines?.includes((index + 1).toString())
          ? "1px solid black"
          : "",
      }}
      onClick={() => {
        router.push(
          `/team?teamid=${team.TeamID}&associationid=${team.AssociationID}`
        );
      }}
    >
      <Cell>{index + 1}</Cell>
      <Cell>{team.TeamAbbrv}</Cell>
      <Cell>{team.TeamGames}</Cell>
      <Cell>{team.TeamWins}</Cell>
      <Cell>{team.TeamTies}</Cell>
      <Cell>{team.TeamLosses}</Cell>
      <Cell>{team.TeamGoalsFor}</Cell>
      <Cell>-</Cell>
      <Cell>{team.TeamGoalsAgainst}</Cell>
      <Cell>{team.TeamPenaltyMin}</Cell>
      <Cell className="font-bold">{team.TeamPoints}</Cell>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeader colSpan={11}>
              Sarjataulukko {selectedSeason?.SeasonName}
            </TableHeader>
          </TableHeaderRow>
          <tr className="text-lg">
            <th></th>
            <th>Joukkue</th>
            <th>O</th>
            <th>V</th>
            <th>T</th>
            <th>H</th>
            <th>TM</th>
            <th></th>
            <th>PM</th>
            <th>JM</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>{teams}</tbody>
      </table>
    </div>
  );
};

export default Standings;
