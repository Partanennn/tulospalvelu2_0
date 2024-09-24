"use client";

import { IMAGE_URL } from "@/app/api/_lib/urls";
import { GameDay } from "@/app/api/gamesPerDay/route";
import { useSeasonStore } from "@/stores/season-store";
import { Dispatch, SetStateAction } from "react";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import LinkCell from "../Table/LinkCell";
import TableHeaderRow from "../Table/TableHeaderRow";

const COL_COUNT = 7;

type GamesTableProps = {
  data: GameDay[] | null;
  tempData: GameDay[];
  updateTempData: Dispatch<SetStateAction<GameDay[]>>;
  header: string;
};

const GamesTable = ({
  data,
  header,
  tempData,
  updateTempData,
}: GamesTableProps) => {
  const { selectedSeason } = useSeasonStore();

  const gameItems = tempData.map((gameDay) => {
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
            url={`https://www.leijonat.tv/fi/game?ext-id=${game.GameID}&season-id=${selectedSeason?.SeasonNumber}`}
          >
            Lähetys
          </LinkCell>
          <Cell>
            <div className="mx-2 hidden sm:table-cell">
              <MyImage
                src={`${IMAGE_URL}/${game.HomeImg}`}
                height={30}
                width={30}
                alt={game.HomeTeamAbbrv}
              />
            </div>
            <div className="flex justify-center items-center">
              {game.HomeTeamAbbrv}
            </div>
          </Cell>
          <Cell>-</Cell>
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
            className="hidden sm:table-cell"
            url={`https://tulospalvelu.leijonat.fi/gamesheet/?gid=${game.GameID}&lang=fi&season=${selectedSeason?.SeasonNumber}`}
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
              if (tempData && tempData.length > 0) {
                updateTempData([]);
              } else if (
                data &&
                tempData &&
                data.length > 0 &&
                tempData.length === 0
              ) {
                updateTempData(data);
              }
            }}
            colSpan={COL_COUNT}
          >
            {header}
          </TableHeaderRow>
        </thead>
        <tbody>{gameItems}</tbody>
      </table>
    </div>
  );
};

export default GamesTable;
