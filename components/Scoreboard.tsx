"use client";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useStandingStore } from "@/stores/standing-store";
import { ReactNode, useEffect } from "react";

type Cell = {
  children: ReactNode;
};
export const Cell = ({ children }: Cell) => {
  return <td className="text-sm px-5 py-1.5 text-center">{children}</td>;
};

const Scoreboard = () => {
  const { selectedSeason } = useSeasonStore();
  const { standing, updateStanding } = useStandingStore();
  const { selectedGroup } = useGroupStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup) {
      const getStandings = async () => {
        const res = await fetch("/api/standings", {
          method: "POST",
          body: JSON.stringify({
            season: selectedSeason.SeasonNumber,
            stgid: selectedGroup.StatGroupID,
          }),
        });

        const data = await res.json();
        updateStanding(data);
      };

      getStandings();
    }
  }, [selectedSeason, selectedGroup]);

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
    <table className="table-auto">
      <thead>
        <tr>
          <th className="text-xl py-3" colSpan={11}>
            Sarjataulukko {selectedSeason?.SeasonName}
          </th>
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
