"use client";

import {
  PlayerStats,
  playerStatsAction,
  PlayerStatsBase,
} from "@/app/_actions/playerStatsAction";
import { PLAYER_EXTERNAL_URL, PLAYER_IMAGE_URL } from "@/app/api/_lib/urls";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useEffect, useState } from "react";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import HiddableHeaderCell from "../Table/HiddableHeaderCell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";
import TableTitleRow from "../Table/TableTitleRow";
import { useRouter } from "next/navigation";

const GoalScorers = () => {
  const [data, setData] = useState<PlayerStatsBase | null>(null);
  const [showData, setShowData] = useState<PlayerStats[] | null>([]);
  const router = useRouter();

  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup) {
      const getData = async () => {
        const data = await playerStatsAction({
          group: selectedGroup,
          season: selectedSeason,
          sortedBy: "PlayerGoals",
        });

        if (data) {
          setData(data);
          setShowData(data.Players);
        }
      };
      getData();
    }
  }, [selectedSeason, selectedGroup]);

  const items = showData?.map((player) => (
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
      <Cell
        noTextCenter
        className="hover:cursor-pointer"
        onClick={() => {
          router.push(`/player?playerid=${player.LinkID}`);
        }}
      >
        {player.FirstName} {player.LastName}
      </Cell>
      <Cell>{player.CurrentTeam}</Cell>
      <Cell>{player.PlayerGames}</Cell>
      <Cell className="font-bold">{player.PlayerGoals}</Cell>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow
            onClick={() => {
              if (showData && showData.length > 0) {
                setShowData([]);
              } else if (
                data &&
                showData &&
                data.Players &&
                data.Players.length > 0 &&
                showData.length === 0
              ) {
                setShowData(data.Players);
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

export default GoalScorers;
