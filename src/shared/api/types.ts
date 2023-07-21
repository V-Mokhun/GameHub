export interface Token {
  access_token: string,
  expires_in: number,
  token_type: string
}

export enum GameStatus {
  "NONE" = "None",
  "WANT_TO_PLAY" = "Want to Play",
  "COMPLETED" = "Completed",
  "PLAYING" = "Playing",
  "WANT_TO_REPLAY" = "Want to Replay",
  "ABANDONED" = "Abandoned",
}
