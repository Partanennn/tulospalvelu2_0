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

const PlayerPenaltyStats = () => {
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data } = useFetch<PlayerStatsBase>("/api/playerStats", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      sortedBy: "PlayerPenaltyMin",
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
      <HiddableCell>{player.PlayerPen20Min}</HiddableCell>
      <Cell>{player.PlayerPen2Min}</Cell>
      <Cell>{player.PlayerPenaltyMin} min</Cell>
    </tr>
  ));

  return (
    <div className="my-5">
      <table>
        <thead>
          <TableHeaderRow colSpan={8}>Jäähypörssi</TableHeaderRow>
          <tr>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <th>Pelaaja</th>
            <th>Joukkue</th>
            <th>Ottelut</th>
            <HiddableHeaderCell>PR</HiddableHeaderCell>
            <th>2min</th>
            <th>Yht</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerPenaltyStats;
