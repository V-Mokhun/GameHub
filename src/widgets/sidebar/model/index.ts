import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
