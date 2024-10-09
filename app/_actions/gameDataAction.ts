"use server";

import { GAME_DETAILS_URL } from "../_lib/urls";

type GameDataActionProps = {
  gameId: string;
};

export type GameReport = {
  GameLogsUpdate: (
    | GameReportGameLogsUpdateGK
    | GameReportGameLogsUpdateGoal
    | GameReportGameLogsUpdatePenalty
    | GameReportGameLogsUpdateTimeout
  )[];
  GamesUpdate: GameReportGamesUpdate[];
  //GoalkeeperSummary: GameReportGoalkeeperSummary[];
  PeriodSummary: GameReportPeriodSummary;
  Referees: GameReportReferees[];
  WinningShots: string[]; // Needs update
};

type GameLogsUpdateBase = {
  GameTime: number;
  Key: string;
  Period: number;
  TeamId: number;
};

export type GameReportGamesUpdate = {
  Arena: string;
  AwayTeam: GameReportGamesUpdateTeam;
  FinishedType: 0 | 1; // 0: Not finished, 1: Finished
  GameRules: string;
  GameStatus: number;
  GameTime: number;
  HomeTeam: GameReportGamesUpdateTeam;
  Id: number;
  LevelID: string;
  LevelName: string;
  LiveFeedSource: boolean;
  LiveURL: string;
  OnlyStreamStorage: boolean;
  RinkLatitude: string;
  RinkLongitude: string;
  Spectators: number;
  StartDate: string;
  StartTime: string;
  StatGroupName: string;
};

export type GameReportGamesUpdateTeam = {
  Name: string;
  Goals: number;
  Image: string;
  Id: number;
};

export type GameReportGameLogsUpdateTimeout = {
  GameTime: number;
  Period: number;
  TeamId: number;
  Type: "Timeout";
};

export type GameReportGameLogsUpdateGoal = GameLogsUpdateBase & {
  Ass1LinkID: string;
  Ass2LinkID: string;
  AwayTeamGoals: number;
  FirstAssistJersey: number;
  FirstAssistName: string;
  GoalSpecialTypeEN: string;
  GoalSpecialTypeFI: string;
  GoalType: string;
  HomeTeamGoals: number;
  Minus: string;
  Plus: string;
  ScorerJersey: number;
  ScorerLinkID: string;
  ScorerName: string;
  SecondAssistJersey: number;
  SecondAssistName: string;
  TeamId: number;
  Type: "Goal";
};

export type GameReportGameLogsUpdatePenalty = GameLogsUpdateBase & {
  Jersey: number;
  Name: string;
  PenaltyFaultCodes: number;
  PenaltyLField: string;
  PenaltyMinutes: string;
  PenaltyMinutesNumber: string;
  PenaltyReasonAbbreviation: string;
  PenaltyReasonsEN: string;
  PenaltyReasonsFI: string;
  Period: number;
  PlayerLinkID: string;
  SufferLinkID: string;
  SuffererJersey: number;
  SuffererNames: string;
  TeamId: number;
  Type: "Penalty";
};

export type GameReportGameLogsUpdateGK = GameLogsUpdateBase & {
  GoalkeeperJersey: number;
  GoalkeeperName: string;
  PlayerLinkID: string;
  PreviousGoalKeeperJersey: number;
  PreviousGoalKeeperName: string;
  PreviousPlayerLinkID: string;
  Type: "GK_start" | "GK_change";
};

type GameReportReferees = {
  RefereeRole: string;
  RefereeName: string;
};

type GameReportPeriodSummary = {
  PeriodGoals: PeriodGoals[];
  PeriodPPGoals: PeriodPPGoals[];
  PeriodPPMins: PeriodPPMins[];
  PeriodPenMins: PeriodPenMins[];
  PeriodSHGoals: PeriodSHGoals[];
  PeriodSaves: PeriodSaves[];
  PlayerPeriods: string;
};

type PeriodGoals = {
  Goals: string;
};

type PeriodPPGoals = {
  PPGoals: string;
};

type PeriodPPMins = {
  PPMins: string;
};

type PeriodPenMins = {
  PenMins: string;
};

type PeriodSHGoals = {
  SHGoals: string;
};

type PeriodSaves = {
  Saves: string;
};

export const getGameDataAction = async ({
  gameId,
}: GameDataActionProps): Promise<GameReport | null> => {
  const url = GAME_DETAILS_URL;

  const body = new FormData();
  body.append("gameid", gameId);

  try {
    const result = await fetch(url, {
      method: "POST",
      body: body,
    });

    const data: GameReport | null = await result.json();

    return data;
  } catch (error) {
    console.error(`Something went wrong in getGameDataAction: ${error}`);
    return null;
  }
};
