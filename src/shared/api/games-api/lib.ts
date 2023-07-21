import { GameCategories } from "./types";

export const GAME_CATEGORIES: { name: string; value: GameCategories }[] = [
  { name: "Main Game", value: GameCategories.MAIN_GAME },
  { name: "DLC / Addon", value: GameCategories.DLC_ADDON },
  { name: "Remake", value: GameCategories.REMAKE },
  { name: "Remaster", value: GameCategories.REMASTER },
  { name: "Expansion", value: GameCategories.EXPANSION },
  { name: "Mod", value: GameCategories.MOD },
  { name: "Bundle", value: GameCategories.BUNDLE },
  { name: "Standalone Expansion", value: GameCategories.STANDALONE_EXPANSION },
  { name: "Episode", value: GameCategories.EPISODE },
  { name: "Season", value: GameCategories.SEASON },
  { name: "Expanded Game", value: GameCategories.EXPANDED_GAME },
];
