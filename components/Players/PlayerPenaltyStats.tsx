"use client";

import { PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStatsBase } from "@/utils/types";
import Image from "next/image";
import Cell from "../Table/Cell";
import TableHeaderRow from "../Table/TableHeaderRow";

const PlayerPenaltyStats = () => {
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data } = useFetch<PlayerStatsBase>("/api/playerStats", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      nop: "15",
      sortedBy: "PlayerPenaltyMin",
    }),
  });

  const items = data?.Players.map((player) => (
    <tr
      key={player.PlayerID}
      className="odd:bg-neutral-500 even: bg-neutral-300"
    >
      <Cell>
        <Image
          alt=""
          src={`${PLAYER_IMAGE_URL}/${player.Img}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </Cell>
      <Cell>
        {player.FirstName} {player.LastName}
      </Cell>
      <Cell>{player.CurrentTeam}</Cell>
      <Cell>{player.PlayerGames}</Cell>
      <Cell>{player.PlayerPen25min}</Cell>
      <Cell>{player.PlayerPen2Min}</Cell>
      <Cell>{player.PlayerPenaltyMin}</Cell>
    </tr>
  ));

  return (
    <div className="my-5">
      <table>
        <thead>
          <TableHeaderRow colSpan={8}>Jäähypörssi</TableHeaderRow>
          <tr>
            <th></th>
            <th>Pelaaja</th>
            <th>Joukkue</th>
            <th>Ottelut</th>
            <th>PR</th>
            <th>2min</th>
            <th>Minuutit</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerPenaltyStats;
