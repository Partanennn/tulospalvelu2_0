"use client";

import { PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStats, PlayerStatsBase } from "@/utils/types";
import { useEffect, useState } from "react";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";
import TableTitleRow from "../Table/TableTitleRow";

const PlayerTotalPoints = () => {
  const [tempData, setTempData] = useState<PlayerStats[]>([]);

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

  useEffect(() => {
    if (data) {
      setTempData(data.Players);
    }
  }, [data]);

  const items = tempData.map((player) => (
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
      <Cell className="text-center">{player.PlayerGames}</Cell>
      <Cell className="text-center">{player.PlayerGoals}</Cell>
      <Cell className="text-center">{player.PlayerAssists}</Cell>
      <Cell className="font-bold text-center">{player.PlayerPoints}</Cell>
    </tr>
  ));

  return (
    <div className="my-5">
      <table>
        <thead>
          <TableHeaderRow
            onClick={() => {
              if (tempData.length > 0) {
                setTempData([]);
              } else if (
                data &&
                data.Players &&
                data.Players.length > 0 &&
                tempData.length === 0
              ) {
                setTempData(data.Players);
              }
            }}
          >
            <TableHeader colSpan={10}>Pistepörssi</TableHeader>
          </TableHeaderRow>
          <TableTitleRow>
            <HiddableCell> </HiddableCell>
            <HiddableCell> </HiddableCell>
            <Cell>Pelaaja</Cell>
            <Cell>Joukkue</Cell>
            <Cell>Ottelut</Cell>
            <Cell>Maalit</Cell>
            <Cell>Syötöt</Cell>
            <Cell>Pisteet</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerTotalPoints;
