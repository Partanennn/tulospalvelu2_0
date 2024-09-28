"use client";

import { PLAYER_EXTERNAL_URL } from "@/app/api/_lib/urls";
import { HandleTempClick } from "@/utils/helpers";
import { TeamInfoPlayer } from "@/utils/types";
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
      <Cell noTextCenter>
        <a
          className="hover:cursor-pointer"
          target="_blank"
          href={`${PLAYER_EXTERNAL_URL}${player.PersonID}`}
        >
          {player.LastName} {player.FirstName}
        </a>
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
            onClick={() => HandleTempClick(data, players, setPlayers)}
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
