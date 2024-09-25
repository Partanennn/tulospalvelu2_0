import { create } from "zustand";

export type TeamStats = {
  StandingLines: string[];
  StdRankingTypes: number;
  Teams: Team[];
  Total: string;
  WinPoints: number;
};

export type Team = {
  AssociationID: string;
  Ranking: number;
  TeamAbbrv: string;
  TeamGames: number;
  TeamGoalDiff: number;
  TeamGoalsAgainst: number;
  TeamGoalsAgainstPP: number;
  TeamGoalsAgainsSH: number;
  TeamGoalsFor: number;
  TeamGoalsForPP: number;
  TeamGoalsForSH: number;
  TeamID: string;
  TeamImg: string;
  TeamLosses: number;
  TeamOTLosses: number;
  TeamOTWins: number;
  TeamPen2Min: number;
  TeamPen5min: number;
  TeamPen10min: number;
  TeamPen20Min: number;
  TeamPen25Min: number;
  TeamPenaltyMin: number;
  TeamPoints: number;
  TeamSpectators: number;
  TeamTies: number;
  TeamWSLosses: number;
  TeamWSWins: number;
  TeamWins: number;
};

type TeamStore = {
  teamStats: TeamStats | null;
  updateTeamStats: (standing: TeamStats) => void;
};

export const useTeamStatsStore = create<TeamStore>((set) => ({
  teamStats: null,
  updateTeamStats: (teamStats: TeamStats) =>
    set(() => {
      teamStats.Teams.sort((a, b) => a.TeamAbbrv.localeCompare(b.TeamAbbrv));
      return { teamStats: teamStats };
    }),
}));
