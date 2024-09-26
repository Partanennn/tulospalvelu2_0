"use client";

import { IMAGE_URL } from "@/app/api/_lib/urls";
import { GameDay } from "@/app/api/gamesPerDay/route";
import useFetch from "@/hooks/useFetch";
import { useGamesStore } from "@/stores/games-store";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import Image from "next/image";
import { useEffect } from "react";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import HiddableCell from "../Table/HiddableCell";
import LinkCell from "../Table/LinkCell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";

const colCount = 10;

const GamesAll = () => {
  const { gamesPerDay, updateGamesPerDay: updateGames } = useGamesStore();
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data: gamesData } = useFetch<GameDay[]>("/api/gamesPerDay", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      gameDays: "all",
    }),
  });

  useEffect(() => {
    if (gamesData) {
      updateGames(gamesData);
    }
  }, [gamesData, updateGames]);

  const gameItems = gamesPerDay.map((gameDay) => {
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
            <div className="flex">
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
          <Cell>-</Cell>
          <Cell>
            <div className="flex">
              <div className="mx-2 hidden sm:table-cell">
                <Image
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
          <Cell>{game.HomeGoals}</Cell>
          <Cell>-</Cell>
          <Cell>{game.AwayGoals}</Cell>
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
        <td colSpan={colCount} className="text-center text-lg py-3 font-bold">
          {gameDate}
        </td>
      </tr>
    );
    return [dayRow, basicRows];
  });

  return (
    <table className="mx-5">
      <thead>
        <TableHeaderRow
          onClick={() => {
            if (gamesPerDay.length > 0) {
              updateGames([]);
            } else if (
              gamesData &&
              gamesData.length > 0 &&
              gamesPerDay.length === 0
            ) {
              updateGames(gamesData);
            }
          }}
        >
          <TableHeader colSpan={colCount}>Kaikki Ottelut</TableHeader>
        </TableHeaderRow>
      </thead>
      <tbody>{gameItems}</tbody>
    </table>
  );
};

export default GamesAll;
