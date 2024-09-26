"use client";

import { HandleTempClick } from "@/utils/helpers";
import { TeamInfoGame } from "@/utils/types";
import { useEffect, useState } from "react";
import Cell from "../../Table/Cell";
import TableHeader from "../../Table/TableHeader";
import TableHeaderRow from "../../Table/TableHeaderRow";
import TableRow from "../../Table/TableRow";

type GamesTableProps = {
  data: TeamInfoGame[];
};

const TeamGamesTable = ({ data }: GamesTableProps) => {
  const [games, setGames] = useState<TeamInfoGame[]>([]);

  const gameItems = data.sort().map((game) => (
    <TableRow key={game.GameID}>
      <Cell>{game.GameDate}</Cell>
      <Cell>{game.HomeTeamAbbreviation}</Cell>
      <Cell>{game.AwayTeamAbbreviation}</Cell>
      <Cell>{game.HomeGoals}</Cell>
      <Cell>-</Cell>
      <Cell>{game.AwayGoals}</Cell>
    </TableRow>
  ));

  useEffect(() => {
    if (data) {
      setGames(data);
    }
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow
            onClick={() => HandleTempClick(data, games, setGames)}
          >
            <TableHeader colSpan={6}>Ottelut</TableHeader>
          </TableHeaderRow>
        </thead>
        <tbody>{gameItems}</tbody>
      </table>
    </div>
  );
};

export default TeamGamesTable;
