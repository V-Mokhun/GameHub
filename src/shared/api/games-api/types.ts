export interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export enum GameCategories {
  MAIN_GAME = 0,
  DLC_ADDON = 1,
  EXPANSION = 2,
  BUNDLE = 3,
  STANDALONE_EXPANSION = 4,
  MOD = 5,
  EPISODE = 6,
  SEASON = 7,
  REMAKE = 8,
  REMASTER = 9,
  EXPANDED_GAME = 10,
}

export enum ImageTypes {
  "SMALL_COVER" = "cover_small",
  "MEDIUM_SCREENSHOT" = "screenshot_med",
  "BIG_COVER" = "cover_big",
  "MEDIUM_LOGO" = "logo_med",
  "BIG_SCREENSHOT" = "screenshot_big",
  "HUGE_SCREENSHOT" = "screenshot_huge",
  "THUMB" = "thumb",
  "MICRO" = "micro",
  "720P" = "720p",
  "1080P" = "1080p",
}

export type GameTheme = {
  id: number;
  name: string;
  slug?: string;
};

export type GameGenre = GameTheme;
export type GameMode = GameTheme;

export enum SortFields {
  RATING = "total_rating",
  RELEASE_DATE = "first_release_date",
}

export enum SortFieldsOrder {
  ASC = "asc",
  DESC = "desc",
}

export type GameSorts = {
  field: SortFields;
  order: SortFieldsOrder;
};

export type GamePaginate = {
  limit: number;
  offset: number;
};

export interface GameFilters {
  name?: string;
  ratingMin: number;
  ratingMax: number;
  categories: number[];
  themes: number[];
  genres: number[];
  gameModes: number[];
}

export interface SearchGame {
  id: number;
  cover: string;
  releaseDate?: Date;
  name: string;
  rating: number;
}

export interface Game extends SearchGame {
  category: number;
  themes?: number[];
  gameModes?: number[];
  genres?: number[];
}

export interface FullGame extends Game {
  artworks: number[];
  category: number;
  game_modes: number[];
  genres: number[];
  themes: number[];
  involved_companies: number[];
  platforms: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  storyline: string;
  summary: string;
  videos: number[];
}
