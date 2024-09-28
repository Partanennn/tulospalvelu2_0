"use client";

import { PLAYER_EXTERNAL_URL, PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { PlayerStats, PlayerStatsBase } from "@/utils/types";
import { useEffect, useState } from "react";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import HiddableHeaderCell from "../Table/HiddableHeaderCell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";
import TableTitleRow from "../Table/TableTitleRow";

const PlayerGoalScorers = () => {
  const [tempData, setTempData] = useState<PlayerStats[]>([]);

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
      <Cell noTextCenter>
        <a
          className="hover:cursor-pointer"
          target="_blank"
          href={`${PLAYER_EXTERNAL_URL}${player.LinkID}`}
        >
          {player.FirstName} {player.LastName}
        </a>
      </Cell>
      <Cell>{player.CurrentTeam}</Cell>
      <Cell>{player.PlayerGames}</Cell>
      <Cell className="font-bold">{player.PlayerGoals}</Cell>
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
            <TableHeader colSpan={6}>Maalipörssi</TableHeader>
          </TableHeaderRow>
          <TableTitleRow>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <Cell>Pelaaja</Cell>
            <Cell>Joukkue</Cell>
            <Cell>Ottelut</Cell>
            <Cell>Maalit</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PlayerGoalScorers;
