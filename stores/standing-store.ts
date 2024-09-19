import { create } from "zustand";

export type Standing = {
  StandingLines: string[];
  StdRankingTypes: number;
  Teams: StandingTeam[];
  WinPoints: number;
};

export type StandingTeam = {
  Games: string;
  GoalDiff: string;
  GoalsAgainst: string;
  GoalsFor: string;
  Looses: string;
  OtLooses: string;
  OtWins: string;
  PenaltyMinutes: string;
  Points: string;
  PointsPerGame: string;
  Ranking: string;
  SeasonID: string;
  StatGroupID: string;
  TeamAbbrv: string;
  TeamAssociation: string;
  TeamID: string;
  TeamImg: string;
  Ties: string;
  UniqueID: string;
  Wins: string;
};

type StandingStore = {
  standing: Standing | null;
  updateStanding: (standing: Standing) => void;
};

export const useStandingStore = create<StandingStore>((set) => ({
  standing: null,
  updateStanding: (standing: Standing) => set(() => ({ standing })),
}));
