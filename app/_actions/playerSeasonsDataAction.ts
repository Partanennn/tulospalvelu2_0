"use server";

import { PLAYER_SEASONS_DATA_URL } from "../api/_lib/urls";

export type PlayerSeasonsData = {
  GoalKeeper: PlayerSeasonsDataInfo[];
  Skater: PlayerSeasonsDataInfo[];
};

export type PlayerSeasonsDataInfo = {
  LevelID: string;
  LevelName: string;
  LevelTeams: PlayerSeasonsDataInfoLevelTeam[];
  LevelWebOrder: string;
  RoleID: string;
  SeasonName: string;
  SeasonNumber: string;
};

type PlayerSeasonsDataInfoLevelTeam = {
  AssAbbrv: string;
  TeamAbbrv: string;
  TeamID: string;
};

type PlayerSeasonsDataProps = {
  playerId: string;
  seasonNumber?: string;
};

export const playerSeasonsDataAction = async ({
  playerId,
  seasonNumber = "0",
}: PlayerSeasonsDataProps): Promise<PlayerSeasonsData | null> => {
  const url = PLAYER_SEASONS_DATA_URL;

  const formData = new FormData();
  formData.append("lkq", playerId);
  formData.append("filters[All]", "1");
  formData.append("filters[Series]", "0");
  formData.append("filters[Games]", "0");
  formData.append("filters[SeasonNumber]", seasonNumber);

  try {
    const result = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(`Error happened on playerSeasonsDataAction: ${error}`);
    return null;
  }
};
