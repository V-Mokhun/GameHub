import { create } from "zustand";

interface BrowseFilterState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBrowseFilterStore = create<BrowseFilterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
