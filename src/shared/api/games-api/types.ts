import { GameReview, GameReviewVote, User } from "@prisma/client";
import { NormalizedLibraryGame } from "../user-library-api/types";

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
  PORT = 11,
  FORK = 12,
  PACK = 13,
  UPDATE = 14,
}

export enum GameWebsites {
  OFFICIAL = 1,
  TWITCH = 6,
  YOUTUBE = 9,
  STEAM = 13,
  EPICGAMES = 16,
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

export enum ReviewSortFields {
  TOTAL_VOTES = "votes",
  RATING = "rating",
  CREATED_AT = "createdAt",
}

export enum SortFieldsOrder {
  ASC = "asc",
  DESC = "desc",
}

export type GameSorts = {
  field: SortFields;
  order: SortFieldsOrder;
};

export type ReviewSorts = { 
  order: SortFieldsOrder;
  field: ReviewSortFields;
  hideSpoilers: boolean;
}

export type Paginate = {
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
  cover?: string;
  releaseDate?: Date;
  name: string;
  rating: number;
}

export interface Game extends SearchGame {
  category: number;
  themes: number[];
  gameModes: number[];
  genres: number[];
}

export type ImportedGame = Game & { websites: { id: number; url: string }[] };

export interface FullGame extends SearchGame {
  artworks: string[];
  videos: { url: string; name: string }[];
  category: number;
  themes: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  gameModes: { id: number; name: string }[];
  summary?: string;
  storyline?: string;
  similarGames: Game[];
  dlcs: Game[];
  expansions: Game[];
  remakes: Game[];
  remasters: Game[];
  screenshots: string[];
  companyLogos: { name: string; url: string }[];
  collection: Game[];
  franchise: Game[];
  parent?: {
    id: number;
    name: string;
  };
  criticsRating?: number;
  websites?: { category: GameCategories; url: string }[];
}

export type FullGameReview = GameReview & {
  user: Pick<User, "id" | "imageUrl" | "username">;
  votes: GameReviewVote[]
};

export type SingleGameReview = FullGameReview & { game: NormalizedLibraryGame };

export type CreateOrEditReview = Omit<
  GameReview,
  "gameId" | "createdAt" | "updatedAt" | "id"
>;
