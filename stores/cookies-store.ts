import { create } from "zustand";

type CookieStore = {
  seasonCookie: string | null;
  levelCookie: string | null;
  groupCookie: string | null;
  setSeasonCookie: (newCookie: string | null) => void;
  setLevelCookie: (newCookie: string | null) => void;
  setGroupCookie: (newCookie: string | null) => void;
};

export const useCookiesStore = create<CookieStore>((set) => ({
  seasonCookie: null,
  levelCookie: null,
  groupCookie: null,
  setSeasonCookie: (newCookie) => set(() => ({ seasonCookie: newCookie })),
  setLevelCookie: (newCookie) => set(() => ({ levelCookie: newCookie })),
  setGroupCookie: (newCookie) => set(() => ({ groupCookie: newCookie })),
}));
