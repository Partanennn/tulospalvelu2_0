import { create } from "zustand";

export type Game = {};

type GamesStore = {
  games: Game[];
  selectedGame: Game | null;
  updateGames: (games: Game[]) => void;
  updateSelectedGame: (game: Game) => void;
};

export const useGamesStore = create<GamesStore>((set) => ({
  games: [],
  selectedGame: null,
  updateGames: (games) => set(() => ({ games })),
  updateSelectedGame: (selectedGame) => set(() => ({ selectedGame })),
}));
