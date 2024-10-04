"use server";

import { Game } from "@/stores/games-store";
import { Group } from "@/stores/group-store";
import { Season } from "@/stores/season-store";
import { GET_GAMES_URL } from "../_lib/urls";

export type GameDay = {
  // GameDates: any[];
  Games: Game[];
  LevelID: string;
  LevelName: string;
  // PlayOffPhases: any[];
  // PlayOffTeams: any[];
  WebOrder: string;
};

export type GamesPerDayGameDays = "incoming" | "played" | "today" | "all";

type GamesPerDayProps = {
  season: Season;
  group: Group;
  gameDays?: GamesPerDayGameDays;
  teamId?: string;
};

export const gamesPerDayAction = async ({
  group,
  season,
  gameDays = "all",
  teamId = "0",
}: GamesPerDayProps): Promise<GameDay[] | null> => {
  const url = GET_GAMES_URL;

  const body = new FormData();

  if (gameDays === "all") {
    body.append("gamedays", "3");
  } else if (gameDays === "incoming") {
    body.append("gamedays", "2");
  } else if (gameDays === "played") {
    body.append("gamedays", "1");
  } else if (gameDays === "today") {
    body.append("gamedays", "0");
  }

  body.append("dwl", "0");
  body.append("season", season.SeasonNumber);
  body.append("stgid", group.StatGroupID);
  body.append("teamid", teamId);
  body.append("districtid", "0");
  body.append("dog", new Date().toISOString().split("T")[0]);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data: GameDay[] | null = await res.json();

  return data;
};
