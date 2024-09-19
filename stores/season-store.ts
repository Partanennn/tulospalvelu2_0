import { create } from "zustand";

export type Season = {
  SeasonNumber: string;
  SeasonName: string;
};

type SeasonStore = {
  selectedSeason: Season | null;
  seasons: Season[];
  updateSelectedSeason: (selectedSeason: Season | null) => void;
  updateSeasons: (seasons: Season[]) => void;
};

export const useSeasonStore = create<SeasonStore>((set) => ({
  selectedSeason: null,
  seasons: [],
  updateSelectedSeason: (selectedSeason) => set(() => ({ selectedSeason })),
  updateSeasons: (seasons) => set(() => ({ seasons })),
}));
