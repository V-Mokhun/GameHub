import { Game as LibraryGame } from "@prisma/client";

export const normalizeLibraryGameProperties = (game: LibraryGame) => ({
  ...game,
  themes: game.themes.split(","),
  gameModes: game.gameModes.split(","),
  genres: game.genres.split(","),
});
