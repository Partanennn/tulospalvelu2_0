"use client";

import {
  GameDay,
  gamesPerDayAction,
  GamesPerDayGameDays,
} from "@/app/_actions/gamesPerDayAction";
import {
  EXTERNAL_BROADCAST_URL,
  GAME_SHEET_URL,
  IMAGE_URL,
} from "@/app/_lib/urls";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import { useEffect, useState } from "react";
import MyImage from "./MyImage";
import Cell from "./Table/Cell";
import HiddableCell from "./Table/HiddableCell";
import LinkCell from "./Table/LinkCell";
import TableHeader from "./Table/TableHeader";
import TableHeaderRow from "./Table/TableHeaderRow";

const COL_COUNT = 9;

type GamesTableProps = {
  header: string;
  gameDays?: GamesPerDayGameDays;
};

const GamesTable = ({ header, gameDays = "all" }: GamesTableProps) => {
  const [showData, setShowData] = useState<GameDay[]>([]);
  const [data, setData] = useState<GameDay[] | null>([]);

  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();
  const { selectedLevel } = useLevelStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup && selectedLevel) {
      const getData = async () => {
        const data = await gamesPerDayAction({
          group: selectedGroup,
          season: selectedSeason,
          gameDays: gameDays,
        });

        if (data) {
          setShowData(data);
          setData(data);
        }
      };
      getData();
    }
  }, [selectedSeason, selectedGroup, selectedLevel]);

  const gameItems = showData.map((gameDay) => {
    let gameDate = "";
    const basicRows = gameDay.Games.map((game) => {
      gameDate = game.DowFI + " " + game.GameDate;
      return (
        <tr
          key={game.GameID}
          className="odd:bg-neutral-500 even: bg-neutral-300"
        >
          <Cell>{game.GameTime}</Cell>
          <LinkCell
            className="hidden sm:table-cell"
            url={`${EXTERNAL_BROADCAST_URL}?ext-id=${game.GameID}&season-id=${selectedSeason?.SeasonNumber}`}
          >
            Lähetys
          </LinkCell>
          <Cell>
            <div className="flex justify-start">
              <div className="mx-2 hidden sm:table-cell">
                <MyImage
                  src={`${IMAGE_URL}/${game.HomeImg}`}
                  height={30}
                  width={30}
                  alt={game.HomeTeamAbbrv}
                />
              </div>
              <div className="flex flex-grow justify-center items-center">
                {game.HomeTeamAbbrv}
              </div>
            </div>
          </Cell>
          <Cell>{game.HomeGoals}</Cell>
          <Cell>-</Cell>
          <Cell>{game.AwayGoals}</Cell>
          <Cell>
            <div className="flex justify-start">
              <div className="mx-2 hidden sm:table-cell">
                <MyImage
                  src={`${IMAGE_URL}/${game.AwayImg}`}
                  height={30}
                  width={30}
                  alt={game.AwayTeamAbbrv}
                />
              </div>
              <div className="flex flex-grow justify-center items-center">
                {game.AwayTeamAbbrv}
              </div>
            </div>
          </Cell>
          <HiddableCell>{game.RinkName}</HiddableCell>
          <LinkCell
            url={`${GAME_SHEET_URL}/?gid=${game.GameID}&lang=fi&season=${selectedSeason?.SeasonNumber}`}
          >
            OPK
          </LinkCell>
        </tr>
      );
    });
    const dayRow = (
      <tr key={gameDate}>
        <td colSpan={COL_COUNT} className="text-center text-lg py-3 font-bold">
          {gameDate}
        </td>
      </tr>
    );
    return [dayRow, basicRows];
  });

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
                data.length > 0 &&
                showData.length === 0
              ) {
                setShowData(data);
              }
            }}
          >
            <TableHeader colSpan={COL_COUNT}>{header}</TableHeader>
          </TableHeaderRow>
        </thead>
        <tbody>{gameItems}</tbody>
      </table>
    </div>
  );
};

export default GamesTable;
