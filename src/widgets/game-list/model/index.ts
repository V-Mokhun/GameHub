import { create } from "zustand";

interface GameListState {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

export const useGameListStore = create<GameListState>((set) => ({
  view: "grid",
  setView: (view) => set({ view }),
}));
