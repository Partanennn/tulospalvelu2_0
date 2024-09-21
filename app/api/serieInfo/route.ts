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
  SubSeries: any[];
  Teams: any[];
  WarmUpTime: string;
};

type GameRules = {
  ClockCountDirection: boolean;
  CoachChallenge: boolean;
  DisableVideoReview: boolean;
  ExtraPeriodLengthMinutes: number;
  ExtraPeriodLengthSeconds: number;
  GameBreakStatistics: number;
  GameLengthMinutes: number;
  GameLengthSeconds: number;
  GameSheetType: number;
  HasExtraPeriod: boolean;
  HasOvertime: boolean;
  HasWinningShot: boolean;
  IceHockeyInline: boolean;
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
  PlusMinus: boolean;
  RefereeStats: boolean;
  RosterType: number;
  ShootingMap: boolean;
  Statistics: boolean;
  TimeOnIce: boolean;
};

export const POST = async (req: Request) => {
  const url = GET_SERIE_INFO_URL;

  const reqBody = await req.json();

  const body = new FormData();
  body.append("season", reqBody.season);
  body.append("stgid", reqBody.stgid);
  body.append("levelid", reqBody.levelid);

  const res = await fetch(url, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  return Response.json(data);
};
