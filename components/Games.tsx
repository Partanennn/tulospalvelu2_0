"use client";

import { GameDay } from "@/app/api/gamesPerDay/route";
import { useGamesStore } from "@/stores/games-store";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useEffect } from "react";

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

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={3}>Otteluohjelma</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Value 1</td>
          <td>Value 2</td>
          <td>Value 3</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Games;
