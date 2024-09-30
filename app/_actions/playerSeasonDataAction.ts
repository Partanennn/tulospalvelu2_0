"use server";

import { PLAYER_SEASON_DATA_URL } from "../api/_lib/urls";

type PlayerSeasonInfoProps = {
  playerId: string;
};

export const playerSeasonDataAction = async ({
  playerId,
}: PlayerSeasonInfoProps): Promise<string> => {
  const url = PLAYER_SEASON_DATA_URL;
  return "";
};
