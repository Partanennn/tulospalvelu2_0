"use server";

import { PLAYER_BASIC_INFO_URL } from "../api/_lib/urls";

type PlayerInfoProps = {
  playerId: string;
};

export const playerBasicInfoAction = async ({
  playerId,
}: PlayerInfoProps): Promise<string> => {
  const url = PLAYER_BASIC_INFO_URL;
  return "";
};
