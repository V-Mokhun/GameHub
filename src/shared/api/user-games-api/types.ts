import { SortFields } from "../games-api";

export enum GameStatus {
  "NONE" = "None",
  "WANT_TO_PLAY" = "Want to Play",
  "COMPLETED" = "Completed",
  "PLAYING" = "Playing",
  "WANT_TO_REPLAY" = "Want to Replay",
  "ABANDONED" = "Abandoned",
}

export type UserSortFields = SortFields & {
  USER_RATING: "userRating";
  PLAY_TIME: "playTime";
  FINISHED_DATE: "finishedAt";
};
