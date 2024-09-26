"use client";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { TeamStats, useTeamStatsStore } from "@/stores/team-stats-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cell from "./Table/Cell";
import TableHeader from "./Table/TableHeader";
import TableHeaderRow from "./Table/TableHeaderRow";

const Standings = () => {
  const router = useRouter();

  const { selectedSeason } = useSeasonStore();
  const { teamStats, updateTeamStats } = useTeamStatsStore();
  const { selectedGroup } = useGroupStore();

  const stats = teamStats ? { ...teamStats } : null;

  const { data: standingData } = useFetch<TeamStats>("/api/teamStats", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
    }),
  });

  useEffect(() => {
    if (standingData) {
      updateTeamStats(standingData);
    }
  }, [standingData, updateTeamStats]);

  const teams = stats?.Teams?.sort((a, b) => b.TeamPoints - a.TeamPoints).map(
    (team, index) => (
      <tr
        key={team.TeamID}
        className="odd:bg-neutral-300 hover:cursor-pointer"
        style={{
          borderBottom: stats.StandingLines.includes((index + 1).toString())
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
        <Cell
          onClick={() => {
            router.push(
              `/team?teamid=${team.TeamID}&associationid=${team.AssociationID}`
            );
          }}
        >
          {team.TeamAbbrv}
        </Cell>
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
    )
  );

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
