import { Game as LibraryGame } from "@prisma/client";

export enum LibrarySortFields {
  RATING = "total_rating",
  RELEASE_DATE = "first_release_date",
  USER_RATING = "userRating",
  PLAY_TIME = "playTime",
  FINISHED_DATE = "finishedAt",
}

export type NormalizedLibraryGame = LibraryGame & {
  themes: number[];
  gameModes: number[];
  genres: number[];
};
