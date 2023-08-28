import { GAMES_LIMIT } from "../consts";
import {
  GameCategories,
  GameFilters,
  GameSorts,
  Paginate,
  SortFields,
  SortFieldsOrder,
} from "./types";

export const MIN_RATING = 0;
export const MAX_RATING = 100;

export const GET_GAMES_FIELDS = `fields name, cover.image_id, first_release_date, total_rating, category, themes, game_modes, genres`;

export const GAME_CATEGORIES: { [key: number]: string } = {
  [GameCategories.MAIN_GAME]: "Main Game",
  [GameCategories.DLC_ADDON]: "DLC / Addon",
  [GameCategories.EXPANSION]: "Expansion",
  [GameCategories.REMAKE]: "Remake",
  [GameCategories.REMASTER]: "Remaster",
  [GameCategories.MOD]: "Mod",
  [GameCategories.BUNDLE]: "Bundle",
  [GameCategories.STANDALONE_EXPANSION]: "Standalone Expansion",
  [GameCategories.EPISODE]: "Episode",
  [GameCategories.SEASON]: "Season",
  [GameCategories.EXPANDED_GAME]: "Expanded Game",
  [GameCategories.PORT]: "Port",
  [GameCategories.FORK]: "Fork",
  [GameCategories.PACK]: "Pack",
  [GameCategories.UPDATE]: "Update",
};

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

export const DEFAULT_PAGINATE: Paginate = {
  limit: GAMES_LIMIT,
  offset: 0,
};
