import { Level } from "@/app/api/fetchLevels/route";
import { create } from "zustand";

type LevelStore = {
  selectedLevel: Level | null;
  levels: Level[];
  updateSelectedLevel: (level: Level | null) => void;
  updateLevels: (levels: Level[]) => void;
};

export const useLevelStore = create<LevelStore>((set) => ({
  levels: [],
  selectedLevel: null,
  updateLevels: (levels) => set(() => ({ levels })),
  updateSelectedLevel: (selectedLevel) => set(() => ({ selectedLevel })),
}));
