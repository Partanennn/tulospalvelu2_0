"use server";

import { Group } from "@/stores/group-store";
import { Level } from "@/stores/level-store";
import { Season } from "@/stores/season-store";
import { GET_STAT_GROUP_URL } from "../_lib/urls";

export const getGroupsAction = async (
  season: Season,
  levelId: Level
): Promise<Group[] | null> => {
  const url = GET_STAT_GROUP_URL;

  const body = new FormData();
  body.append("season", season.SeasonNumber);
  body.append("levelid", levelId.LevelID);
  body.append("districtid", "");

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data: Group[] | null = await res.json();

  return data;
};
