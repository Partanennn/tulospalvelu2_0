"use client";

import { PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStatsBase } from "@/utils/types";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";

const PlayerTotalPoints = () => {
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
        <div className="flex gap-0 sm:gap-2 px-0">
          <div className="hidden sm:block">{player.FirstName}</div>
          <div>{player.LastName}</div>
        </div>
      </Cell>
      <Cell>{player.CurrentTeam}</Cell>
      <Cell>{player.PlayerGames}</Cell>
      <Cell>{player.PlayerGoals}</Cell>
      <Cell>{player.PlayerAssists}</Cell>
      <Cell className="font-bold">{player.PlayerPoints}</Cell>
    </tr>
  ));

  return (
    <div className="my-5">
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeader colSpan={10}>Pistepörssi</TableHeader>
          </TableHeaderRow>
          <tr>
            <HiddableCell> </HiddableCell>
            <HiddableCell> </HiddableCell>
            <th>Pelaaja</th>
            <th>Joukkue</th>
            <th>O</th>
            <th>M</th>
            <th>S</th>
            <th>Pisteet</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerTotalPoints;
