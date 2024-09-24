"use client";

import { PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStatsBase } from "@/utils/types";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import HiddableHeaderCell from "../Table/HiddableHeaderCell";
import TableHeaderRow from "../Table/TableHeaderRow";

const PlayerGoalScorers = () => {
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data } = useFetch<PlayerStatsBase>("/api/playerStats", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      sortedBy: "PlayerGoals",
    }),
  });

  const items = data?.Players.map((player) => (
    <tr
      key={player.PlayerID}
      className="odd:bg-neutral-500 even: bg-neutral-300"
    >
      <HiddableCell>
        <MyImage
          alt=""
          src={`${PLAYER_IMAGE_URL}/${player.Img}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </HiddableCell>
      <HiddableCell>#{player.JerseyNr}</HiddableCell>
      <Cell>
        {player.FirstName} {player.LastName}
      </Cell>
      <Cell>{player.CurrentTeam}</Cell>
      <Cell>{player.PlayerGames}</Cell>
      <Cell>{player.PlayerGoals}</Cell>
      <HiddableCell>+</HiddableCell>
      <Cell>{player.PlayerAssists}</Cell>
      <HiddableCell>=</HiddableCell>
      <Cell className="font-bold">{player.PlayerPoints}</Cell>
    </tr>
  ));

  return (
    <div className="my-5">
      <table>
        <thead>
          <TableHeaderRow colSpan={10}>Maalipörssi</TableHeaderRow>
          <tr>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <th>Pelaaja</th>
            <th>Joukkue</th>
            <th>O</th>
            <th>M</th>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <th>S</th>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerGoalScorers;
