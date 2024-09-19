import { create } from "zustand";

export type Group = {
  StatGroupID: string;
  StatGroupName: string;
};

type GroupStore = {
  selectedGroup: Group | null;
  groups: Group[];
  updateSelectedGroup: (selectedGroup: Group | null) => void;
  updateGroups: (groups: Group[]) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  selectedGroup: null,
  updateGroups: (groups) => set(() => ({ groups })),
  updateSelectedGroup: (selectedGroup) => set(() => ({ selectedGroup })),
}));
