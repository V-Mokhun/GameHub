import { GameStatus, Game as LibraryGame } from "@prisma/client";
import { GameFilters, SortFieldsOrder } from "../games-api";

export enum LibrarySortFields {
  RATING = "totalRating",
  RELEASE_DATE = "releaseDate",
  USER_RATING = "userRating",
  PLAY_TIME = "playTime",
  ADDED_DATE = "createdAt",
  UPDATED_DATE = "updatedAt",
}

export interface LibraryGameFilters extends GameFilters {
  userRatingMin: number;
  userRatingMax: number;
  status: GameStatus | undefined;
}

export interface LibraryGameSorts {
  field: LibrarySortFields;
  order: SortFieldsOrder;
}

export type NormalizedLibraryGame = Omit<
  LibraryGame,
  "themes" | "gameModes" | "genres"
> & {
  themes: number[];
  gameModes: number[];
  genres: number[];
};
