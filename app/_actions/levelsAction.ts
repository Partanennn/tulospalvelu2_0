"use server";

import { Level } from "@/stores/level-store";
import { Season } from "@/stores/season-store";
import { GET_LEVELS_URL } from "../_lib/urls";

export const getLevelsAction = async (
  season: Season
): Promise<Level[] | null> => {
  const url = GET_LEVELS_URL;

  const body = new FormData();
  body.append("season", season.SeasonNumber);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data: Level[] | null = await res.json();

  return data;
};
