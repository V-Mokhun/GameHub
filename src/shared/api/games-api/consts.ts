import { GAMES_LIMIT } from "../consts";
import {
  GameCategories,
  GameFilters,
  GamePaginate,
  GameSorts,
  SortFields,
  SortFieldsOrder,
} from "./types";

export const MIN_RATING = 0;
export const MAX_RATING = 100;

export const GAME_CATEGORIES: { name: string; id: GameCategories }[] = [
  { name: "Main Game", id: GameCategories.MAIN_GAME },
  { name: "DLC / Addon", id: GameCategories.DLC_ADDON },
  { name: "Remake", id: GameCategories.REMAKE },
  { name: "Remaster", id: GameCategories.REMASTER },
  { name: "Expansion", id: GameCategories.EXPANSION },
  { name: "Mod", id: GameCategories.MOD },
  { name: "Bundle", id: GameCategories.BUNDLE },
  { name: "Standalone Expansion", id: GameCategories.STANDALONE_EXPANSION },
  { name: "Episode", id: GameCategories.EPISODE },
  { name: "Season", id: GameCategories.SEASON },
  { name: "Expanded Game", id: GameCategories.EXPANDED_GAME },
];

export const DEFAULT_FILTERS: GameFilters = {
  name: "",
  categories: [],
  genres: [],
  themes: [],
  gameModes: [],
  ratingMin: MIN_RATING,
  ratingMax: MAX_RATING,
};

export const DEFAULT_SORT: GameSorts = {
  field: SortFields.RATING,
  order: SortFieldsOrder.DESC,
};

export const DEFAULT_PAGINATE: GamePaginate = {
  limit: GAMES_LIMIT,
  offset: 0,
};
