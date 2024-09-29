"use server";

import { Season } from "@/stores/season-store";
import { GET_TEAM_INFO_URL } from "../api/_lib/urls";
import { TeamInfo } from "@/utils/types";

type TeamInfoProps = {
  teamId: string;
  season: Season;
  associationId: string;
};

export const teamInfoAction = async ({
  associationId,
  season,
  teamId,
}: TeamInfoProps): Promise<TeamInfo | null> => {
  const url = GET_TEAM_INFO_URL;

  const body = new FormData();
  body.append("teamid", teamId);
  body.append("seasonnumber", season.SeasonNumber);
  body.append("associationid", associationId);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data: TeamInfo | null = await res.json();

  return data;
};
