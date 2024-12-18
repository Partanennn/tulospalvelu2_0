"use client";

import { handleTempClick } from "@/utils/helpers";
import { TeamInfoGame } from "@/utils/types";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const gameItems = data.sort().map((game) => (
    <TableRow
      key={game.GameID}
      className="hover:cursor-pointer"
      onClick={() => router.push(`/games/${game.GameID}`)}
    >
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
            onClick={() => handleTempClick(data, games, setGames)}
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
