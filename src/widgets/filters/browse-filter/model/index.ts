import { DEFAULT_FILTERS, GameFilters } from "@shared/api";
import { create } from "zustand";

interface BrowseFilterState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: GameFilters;
  updateFilters: (
    key: keyof GameFilters,
    value: GameFilters[keyof GameFilters]
  ) => void;
  resetFilters: () => void;
  setFilters: (filters: Partial<GameFilters>) => void;
}

export const useBrowseFilterStore = create<BrowseFilterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  filters: DEFAULT_FILTERS,
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  updateFilters: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setFilters: (filters) => set({ filters: { ...DEFAULT_FILTERS, ...filters } }),
}));
