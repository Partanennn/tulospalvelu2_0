import { GameDay } from "@/app/_actions/gamesPerDayAction";
import { create } from "zustand";

export type Game = {
  AreaID: string;
  AwayAssociation: string;
  AwayGoals: string;
  AwayImg: string;
  AwayTeam: string;
  AwayTeamAbbrv: string;
  AwayTeamTempName: string;
  DeniedResults: number;
  DeniedStats: number;
  DowEN: string;
  DowFI: string;
  DowSE: string;
  FinishedType: string;
  GameDate: string;
  GameDateDB: string;
  GameDateShort: string;
  GameEffTime: string;
  GameID: string;
  GameRules: string;
  GameStatus: string;
  GameTime: string;
  GameTitle: string;
  GameTitleID: number;
  GameTitleOrder: number;
  HomeAssociation: string;
  HomeGoals: string;
  HomeImg: string;
  HomeTeam: string;
  HomeTeamAbbrv: string;
  HomeTeamTempName: string;
  Latitude: string;
  LevelID: string;
  LevelName: string;
  LiveFeedSource: string;
  LiveURL: string;
  Longitude: string;
  OnlyStreamStorage: string;
  PeriodSummary: PeriodSummary[];
  RinkAreaID: string;
  RinkName: string;
  SmallAreaGame: string;
  Spectator: string;
  StatGroupID: string;
  StatGroupName: string;
  TimeZone: string;
  WebOrder: string;
};

type PeriodSummary = {
  PeriodGoals: PeriodGoals[];
  PlayedPeriods: number;
};

type PeriodGoals = {
  Away: number[];
  Home: number[];
};

type GamesStore = {
  gamesPerDay: GameDay[];
  selectedGame: Game | null;
  updateGamesPerDay: (games: GameDay[]) => void;
  updateSelectedGame: (game: Game) => void;
};

export const useGamesStore = create<GamesStore>((set) => ({
  gamesPerDay: [],
  selectedGame: null,
  updateGamesPerDay: (games) => set(() => ({ gamesPerDay: games })),
  updateSelectedGame: (selectedGame) => set(() => ({ selectedGame })),
}));
