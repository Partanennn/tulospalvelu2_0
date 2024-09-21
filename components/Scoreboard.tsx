"use client";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { Standing, useStandingStore } from "@/stores/standing-store";
import { useEffect } from "react";
import Cell from "./Table/Cell";
import TableHeader from "./Table/TableHeader";

const Scoreboard = () => {
  const { selectedSeason } = useSeasonStore();
  const { standing, updateStanding } = useStandingStore();
  const { selectedGroup } = useGroupStore();

  const { data: standingData } = useFetch<Standing>("/api/standings", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
    }),
  });

  useEffect(() => {
    if (standingData) {
      updateStanding(standingData);
    }
  }, [standingData, updateStanding]);

  const teams = standing?.Teams.map((team, index) => (
    <tr
      key={team.UniqueID}
      className="odd:bg-neutral-300"
      style={{
        borderBottom: standing.StandingLines.includes((index + 1).toString())
          ? "1px solid black"
          : "",
      }}
    >
      <Cell>{team.Ranking}</Cell>
      <Cell>{team.TeamAbbrv}</Cell>
      <Cell>{team.Games}</Cell>
      <Cell>{team.Wins}</Cell>
      <Cell>{team.Ties}</Cell>
      <Cell>{team.Looses}</Cell>
      <Cell>{team.GoalsFor}</Cell>
      <Cell>-</Cell>
      <Cell>{team.GoalsAgainst}</Cell>
      <Cell>{team.PenaltyMinutes}</Cell>
      <Cell>{team.Points}</Cell>
    </tr>
  ));

  return (
    <table className="my-5">
      <thead>
        <tr>
          <TableHeader colSpan={11}>
            Sarjataulukko {selectedSeason?.SeasonName}
          </TableHeader>
        </tr>
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
  );
};

export default Scoreboard;
