export interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export type GameTheme = {
  name: string;
  slug: string;
};

export type GameGenre = GameTheme;

export enum SortFields {
  RATING = "total_rating",
  RELEASE_DATE = "first_release_date",
}

export enum SortFieldsOrder {
  ASC = "asc",
  DESC = "desc",
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

export interface GameFilters {
  name?: string;
  ratingMin?: number;
  ratingMax?: number;
  category?: GameCategories[];
  theme?: GameTheme[];
  genre?: GameGenre[];
}
