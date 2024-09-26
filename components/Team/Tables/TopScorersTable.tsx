"use client";

import { HandleTempClick } from "@/utils/helpers";
import { TeamInfoTopScorer } from "@/utils/types";
import { useEffect, useState } from "react";
import Cell from "../../Table/Cell";
import TableHeader from "../../Table/TableHeader";
import TableHeaderRow from "../../Table/TableHeaderRow";
import TableRow from "../../Table/TableRow";
import TableTitleRow from "../../Table/TableTitleRow";

type TopScorersProps = {
  data: TeamInfoTopScorer[];
};

const TopScorersTable = ({ data }: TopScorersProps) => {
  const [topScorers, setTopScorers] = useState<TeamInfoTopScorer[]>([]);

  const sortTopScorers = (a: TeamInfoTopScorer, b: TeamInfoTopScorer) => {
    if (a.Points > b.Points) {
      return -1;
    } else if (a.Points < b.Points) {
      return 11;
    }
    return 0;
  };

  const topScorerItems = topScorers.sort(sortTopScorers).map((player) => (
    <TableRow key={player.PlayerID}>
      <Cell>
        {player.LastName} {player.FirstName}
      </Cell>
      <Cell>{player.Goals}</Cell>
      <Cell>{player.Assists}</Cell>
      <Cell className="font-bold">{player.Points}</Cell>
    </TableRow>
  ));

  useEffect(() => {
    if (data) {
      setTopScorers(data);
    }
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow
            onClick={() =>
              HandleTempClick(data ?? [], topScorers, setTopScorers)
            }
          >
            <TableHeader colSpan={5}>Pistepörssi</TableHeader>
          </TableHeaderRow>
          <TableTitleRow>
            <Cell>Pelaaja</Cell>
            <Cell>Maalit</Cell>
            <Cell>Syötöt</Cell>
            <Cell>Pisteet</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{topScorerItems}</tbody>
      </table>
    </div>
  );
};

export default TopScorersTable;
