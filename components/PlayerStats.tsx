"use client";

import { PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStatsBase } from "@/utils/types";
import Image from "next/image";
import Cell from "./Table/Cell";
import TableHeaderRow from "./Table/TableHeaderRow";

const PlayerStats = () => {
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data } = useFetch<PlayerStatsBase>("/api/playerStats", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      sortedby: "PlayerPoints",
    }),
  });

  const items = data?.Players.map((player) => (
    <tr
      key={player.PlayerID}
      className="odd:bg-neutral-500 even: bg-neutral-300"
    >
      <Cell>
        <Image
          alt="" //{`${player.FirstName} ${player.LastName} image`}
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
      <Cell>{player.PlayerGoals}</Cell>
      <Cell>+</Cell>
      <Cell>{player.PlayerAssists}</Cell>
      <Cell>=</Cell>
      <Cell className="font-bold">{player.PlayerPoints}</Cell>
    </tr>
  ));

  return (
    <div className="my-5">
      <table>
        <thead>
          <TableHeaderRow colSpan={8}>Pistepörssi</TableHeaderRow>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerStats;
