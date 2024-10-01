"use server";

import { PLAYER_BASIC_INFO_URL } from "../api/_lib/urls";

export type PlayerBasicInfo = {
  Age: string;
  AssociationName: string;
  Dob: string;
  FirstAssName: string;
  FirstAssSeason: string;
  FirstName: string;
  Hand: string;
  Height: string;
  JerseyNr: string;
  LastName: string;
  NHLDraft: PlayerNHLDraft | null;
  Nationality: string;
  PlayerIMG: string;
  Pob: string;
  Position: string;
  Weight: string;
};

type PlayerNHLDraft = {
  DraftNumber: string;
  DraftRound: string;
  DraftYear: string;
  DraftedTeam: string;
  LocalClub: string;
  PersonFirstName: string;
  PersonID: string;
  PersonLastName: string;
  Published: string;
  UniqueID: string;
};

type PlayerInfoProps = {
  playerId: string;
};

export const playerBasicInfoAction = async ({
  playerId,
}: PlayerInfoProps): Promise<PlayerBasicInfo | null> => {
  const url = `${PLAYER_BASIC_INFO_URL}${playerId}`;

  const res = await fetch(url, {
    method: "POST",
  });

  const data: PlayerBasicInfo | null = await res.json();

  return data;
};
