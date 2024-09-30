"use server";

type PlayerAllStatsProps = {
  playerId: string;
  age: string;
  season: string;
};

export const playerAllStatsAction = async ({
  playerId,
  age,
  season,
}: PlayerAllStatsProps): Promise<string> => {
  return "";
};
