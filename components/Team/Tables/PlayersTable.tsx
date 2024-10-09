"use client";

import { handleTempClick } from "@/utils/helpers";
import { TeamInfoPlayer } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cell from "../../Table/Cell";
import TableHeader from "../../Table/TableHeader";
import TableHeaderRow from "../../Table/TableHeaderRow";
import TableRow from "../../Table/TableRow";
import TableTitleRow from "../../Table/TableTitleRow";

type PlayersProps = {
  data: TeamInfoPlayer[];
};

const PlayersTable = ({ data }: PlayersProps) => {
  const [players, setPlayers] = useState<TeamInfoPlayer[]>([]);

  const router = useRouter();

  const sortPlayers = (a: TeamInfoPlayer, b: TeamInfoPlayer) => {
    if (parseInt(a.JerseyNr) < parseInt(b.JerseyNr)) {
      return -1;
    } else if (parseInt(a.JerseyNr) > parseInt(b.JerseyNr)) {
      return 1;
    }

    return 0;
  };

  const playerItems = players.sort(sortPlayers).map((player) => (
    <TableRow key={player.PersonID}>
      <Cell>{player.JerseyNr}</Cell>
      <Cell
        noTextCenter
        className="hover:cursor-pointer"
        onClick={() => {
          router.push(`/player/${player.PersonID}`);
        }}
      >
        {player.LastName} {player.FirstName}
      </Cell>
      <Cell>{player.PlayerAge}</Cell>
      <Cell>{player.RoleName}</Cell>
    </TableRow>
  ));

  useEffect(() => {
    if (data) {
      setPlayers(data);
    }
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow
            onClick={() => handleTempClick(data, players, setPlayers)}
          >
            <TableHeader colSpan={5}>Pelaajat</TableHeader>
          </TableHeaderRow>
          <TableTitleRow>
            <td></td>
            <Cell className="text-center">Pelaaja</Cell>
            <Cell>Ikä</Cell>
            <Cell>Rooli</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{playerItems}</tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
