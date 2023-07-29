import { DEFAULT_LIBRARY_FILTERS, LibraryGameFilters } from "@shared/api";
import { create } from "zustand";

interface LibraryFilterState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  filters: LibraryGameFilters;
  updateFilters: (
    key: keyof LibraryGameFilters,
    value: LibraryGameFilters[keyof LibraryGameFilters]
  ) => void;
  resetFilters: () => void;
  setFilters: (filters: Partial<LibraryGameFilters>) => void;
}

export const useLibraryFilterStore = create<LibraryFilterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  filters: DEFAULT_LIBRARY_FILTERS,
  resetFilters: () => set({ filters: DEFAULT_LIBRARY_FILTERS }),
  updateFilters: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setFilters: (filters) =>
    set({ filters: { ...DEFAULT_LIBRARY_FILTERS, ...filters } }),
}));
