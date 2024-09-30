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

const PenaltyStats = () => {
  const [showData, setShowData] = useState<PlayerStats[]>([]);
  const [data, setData] = useState<PlayerStatsBase | null>(null);

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

  const items = showData.map((player) => (
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
      <HiddableCell>{player.PlayerPen20Min}</HiddableCell>
      <Cell>{player.PlayerPen2Min}</Cell>
      <Cell className="font-bold">{player.PlayerPenaltyMin}</Cell>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow
            onClick={() => {
              if (showData.length > 0) {
                setShowData([]);
              } else if (
                data &&
                data.Players &&
                data.Players.length > 0 &&
                showData.length === 0
              ) {
                setShowData(data.Players);
              }
            }}
          >
            <TableHeader colSpan={8}>Jäähypörssi</TableHeader>
          </TableHeaderRow>
          <TableTitleRow>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <HiddableHeaderCell> </HiddableHeaderCell>
            <Cell>Pelaaja</Cell>
            <Cell>Joukkue</Cell>
            <Cell>O</Cell>
            <HiddableHeaderCell>PR</HiddableHeaderCell>
            <Cell>2min</Cell>
            <Cell>Yht</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{items}</tbody>
      </table>
    </div>
  );
};

export default PenaltyStats;
