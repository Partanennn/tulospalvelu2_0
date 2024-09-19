import { create } from "zustand";

export type Standing = {
  StandingLines: string[]; // ?
  StdRankingTypes: number;
  Teams: StandingTeam[];
  WinPoints: number;
};

export type StandingTeam = {
  Games: number;
  GoalDiff: number;
  GoalsAgainst: number;
  GoalsFor: number;
  Looses: number;
  OtLooses: number;
  OtWins: number;
  PenaltyMinutes: number;
  Points: number;
  PointsPerGame: number;
  Ranking: number;
  SeasonID: number;
  StatGroupID: number;
  TeamAbbrv: string;
  TeamAssociation: number;
  TeamID: number;
  TeamImg: string;
  Ties: number;
  UniqueID: number;
  Wins: number;
};

type StandingStore = {
  standing: Standing | null;
  updateStanding: (standing: Standing) => void;
};

export const useStandingStore = create<StandingStore>((set) => ({
  standing: null,
  updateStanding: (standing: Standing) => set(() => ({ standing })),
}));
