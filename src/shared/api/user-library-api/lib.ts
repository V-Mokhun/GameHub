import { GameStatus, Game as LibraryGame } from "@prisma/client";
import { z } from "zod";

export const libraryGameSchema = z.object({
  id: z.number(),
  name: z.string(),
  totalRating: z.number(),
  coverUrl: z.string(),
  releaseDate: z.string().datetime(),
  category: z.number(),
  themes: z.string(),
  genres: z.string(),
  gameModes: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  playTime: z.number().int().min(0).default(0),
  notes: z.string().default(""),
  status: z.nativeEnum(GameStatus).default(GameStatus.WANT_TO_PLAY),
  finishedAt: z.string().datetime().nullable(),
  userId: z.string(),
});

export const normalizeLibraryGameProperties = (game: LibraryGame) => ({
  ...game,
  themes: game.themes.split(",").map(Number),
  gameModes: game.gameModes.split(",").map(Number),
  genres: game.genres.split(",").map(Number),
});
