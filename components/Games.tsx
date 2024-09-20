"use client";

import { GameDay } from "@/app/api/gamesPerDay/route";
import { useGamesStore } from "@/stores/games-store";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { ReactNode, useEffect } from "react";

type CellProps = {
  children: ReactNode;
};
const Cell = ({ children }: CellProps) => (
  <td className="px-2 text-center">{children}</td>
);

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
      gameDate = game.GameDate + " " + game.DowFI;
      return (
        <tr className="odd:bg-neutral-500 even: bg-neutral-200">
          <Cell>
            {game.GameDate} {game.GameTime}
          </Cell>
          <Cell>{game.HomeTeamAbbrv}</Cell>
          <Cell>{game.AwayTeamAbbrv}</Cell>
          <Cell>{game.RinkName}</Cell>
        </tr>
      );
    });
    const dayRow = (
      <tr>
        <td colSpan={4} className="text-center text-lg">
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
          <th colSpan={3}>Otteluohjelma</th>
        </tr>
      </thead>
      <tbody>{gameItems}</tbody>
    </table>
  );
};

export default Games;
