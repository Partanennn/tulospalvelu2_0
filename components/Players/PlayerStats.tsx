"use client";

import { PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStatsBase } from "@/utils/types";
import Cell from "../Table/Cell";
import TableHeaderRow from "../Table/TableHeaderRow";
import MyImage from "../MyImage";

const PlayerStats = () => {
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data } = useFetch<PlayerStatsBase>("/api/playerStats", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      sortedBy: "PlayerPoints",
    }),
  });

  const items = data?.Players.map((player) => (
    <tr
      key={player.PlayerID}
      className="odd:bg-neutral-500 even: bg-neutral-300"
    >
      <Cell>
        <MyImage
          alt=""
          src={`${PLAYER_IMAGE_URL}/${player.Img}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </Cell>
      <Cell>#{player.JerseyNr}</Cell>
      <Cell>
        {player.FirstName} {player.LastName}
      </Cell>
      <Cell>{player.CurrentTeam}</Cell>
      <Cell>{player.PlayerGames}</Cell>
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
          <TableHeaderRow colSpan={10}>Pistepörssi</TableHeaderRow>
          <tr>
            <th></th>
            <th></th>
            <th>Pelaaja</th>
            <th>Joukkue</th>
            <th>Ottelut</th>
            <th>Maalit</th>
            <th></th>
            <th>Syötöt</th>
            <th></th>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerStats;
