"use client";

import {
  PlayerStats,
  playerStatsAction,
  PlayerStatsBase,
} from "@/app/_actions/playerStatsAction";
import { PLAYER_IMAGE_URL } from "@/app/_lib/urls";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";
import TableTitleRow from "../Table/TableTitleRow";

const TotalPoints = () => {
  const [showData, setShowData] = useState<PlayerStats[] | null>([]);
  const [data, setData] = useState<PlayerStatsBase | null>(null);

  const router = useRouter();

  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup) {
      const getData = async () => {
        const playerStats = await playerStatsAction({
          group: selectedGroup,
          season: selectedSeason,
          sortedBy: "PlayerPoints",
        });

        if (playerStats) {
          setData(playerStats);
          setShowData(playerStats.Players);
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
        onClick={() => {
          router.push(`/player?playerid=${player.LinkID}`);
        }}
      >
        <div className="flex gap-0 px-0 hover:cursor-pointer sm:gap-2">
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
                data.Players.length > 0 &&
                showData.length === 0
              ) {
                setShowData(data.Players);
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
            <Cell>O</Cell>
            <Cell>M</Cell>
            <Cell>S</Cell>
            <Cell>Pisteet</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default TotalPoints;
