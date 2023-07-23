import { Game as LibraryGame } from "@prisma/client";

export const normalizeLibraryGameProperties = (game: LibraryGame) => ({
  ...game,
  themes: game.themes.split(",").map(Number),
  gameModes: game.gameModes.split(",").map(Number),
  genres: game.genres.split(",").map(Number),
});
