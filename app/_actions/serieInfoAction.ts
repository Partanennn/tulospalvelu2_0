"use server";

import { Group } from "@/stores/group-store";
import { Level } from "@/stores/level-store";
import { Season } from "@/stores/season-store";
import { GET_SERIE_INFO_URL } from "../_lib/urls";

export type SerieInfo = {
  BeginDate: string;
  BeginDateRaw: string;
  Description: string;
  DisciplinaryContact: string;
  EndDate: string;
  EndDateRaw: string;
  GameRules: GameRules;
  IntermissionTimeBeforeOvertime: string;
  IntermissionTimeBetweenPeriods: string;
  LevelOfReferees: string;
  NumberOfReferees: string;
  SerieID: string;
  SerieManagerEmail: string;
  SerieManagerName: string;
  SerieManagerPhone: string;
  SubSerieID: string;
  // SubSeries: any[];
  // Teams: any[];
  WarmUpTime: string;
};

type GameRules = {
  ClockCountDirection: number;
  CoachChallenge: number;
  DisableVideoReview: number;
  ExtraPeriodLengthMinutes: number;
  ExtraPeriodLengthSeconds: number;
  GameBreakStatistics: number;
  GameLengthMinutes: number;
  GameLengthSeconds: number;
  GameSheetType: number;
  HasExtraPeriod: number;
  HasOvertime: number;
  HasWinningShot: number;
  IceHockeyInline: number;
  MajorPenaltyLengthMinutes: number;
  MajorPenaltyLengthSeconds: number;
  MinorPenaltyLengthMinutes: number;
  MinorPenaltyLengthSeconds: number;
  MultipleGameInOneDay: number;
  NumberOfExtraPeriods: number;
  NumberOfPeriods: number;
  NumberOfPlayers: number;
  OvertimeLengthMinutes: number;
  OvertimeLengthSeconds: number;
  PeriodLengthMinutes: number;
  PeriodLengthSeconds: number;
  PlusMinus: number;
  RefereeStats: number;
  RosterType: number;
  ShootingMap: number;
  Statistics: number;
  TimeOnIce: number;
};

export const getSerieInfo = async (
  season: Season,
  level: Level,
  group: Group
): Promise<SerieInfo | null> => {
  const url = GET_SERIE_INFO_URL;

  const body = new FormData();
  body.append("season", season.SeasonNumber);
  body.append("stgid", group.StatGroupID);
  body.append("levelid", level.LevelID);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data: SerieInfo | null = await res.json();

  return data;
};
