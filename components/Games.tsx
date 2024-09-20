"use client";

import { GameDay } from "@/app/api/gamesPerDay/route";
import { useGamesStore } from "@/stores/games-store";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { imageUrl } from "@/utils/types";
import Image from "next/image";
import { useEffect } from "react";
import Cell from "./Table/Cell";
import LinkCell from "./Table/LinkCell";
import TableHeader from "./Table/TableHeader";

const Games = () => {
  const { gamesPerDay, updateGamesPerDay: updateGames } = useGamesStore();
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup) {
      const getGames = async () => {
        const res = await fetch("/api/gamesPerDay", {
          method: "POST",
          body: JSON.stringify({
            season: selectedSeason?.SeasonNumber,
            stgid: selectedGroup?.StatGroupID,
            gameDays: "all",
          }),
        });
        const newGames = (await res.json()) as GameDay[];

        updateGames(newGames);
      };
      getGames();
    }
  }, [selectedSeason, selectedGroup]);

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
          <Cell className="flex justify-start">
            <div className="mx-2">
              <Image
                src={`${imageUrl}/${game.HomeImg}`}
                height={30}
                width={30}
                alt={game.HomeTeamAbbrv}
              />
            </div>
            <div className="flex flex-grow justify-center items-center">
              {game.HomeTeamAbbrv}
            </div>
          </Cell>
          <Cell>-</Cell>
          <Cell>
            <div className="flex justify-start">
              <div className="mx-2">
                <Image
                  src={`${imageUrl}/${game.AwayImg}`}
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
          <Cell>{game.RinkName}</Cell>
          <LinkCell
            url={`https://tulospalvelu.leijonat.fi/gamesheet/?gid=${game.GameID}&lang=fi&season=${selectedSeason?.SeasonNumber}`}
          >
            OPK
          </LinkCell>
        </tr>
      );
    });
    const dayRow = (
      <tr>
        <td colSpan={7} className="text-center text-lg py-3 font-bold">
          {gameDate}
        </td>
      </tr>
    );
    return [dayRow, basicRows];
  });

  return (
    <table>
      <thead>
        <tr>
          <TableHeader colSpan={7}>Kaikki Ottelut</TableHeader>
        </tr>
      </thead>
      <tbody>{gameItems}</tbody>
    </table>
  );
};

export default Games;
