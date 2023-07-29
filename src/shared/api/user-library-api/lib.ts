import { GameStatus, Game as LibraryGame } from "@prisma/client";
import { z } from "zod";
import { MAX_USER_RATING, MIN_USER_RATING } from "./consts";
import { MAX_RATING, MIN_RATING, SortFieldsOrder } from "../games-api";
import { LibrarySortFields } from "./types";
import { GAMES_LIMIT } from "../consts";

export const libraryGameSchema = z.object({
  id: z.number(),
  name: z.string(),
  totalRating: z.number(),
  coverUrl: z.string(),
  releaseDate: z.string().datetime(),
  category: z.number(),
  themes: z.string(),
  genres: z.string(),
  userRating: z.number().int().min(1).max(10).nullable(),
  gameModes: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  playTime: z.number().int().min(0).default(0),
  notes: z.string().default(""),
  status: z.nativeEnum(GameStatus).default(GameStatus.WANT_TO_PLAY),
  finishedAt: z.string().datetime().nullable(),
  userId: z.string(),
});

export const getFilteredLibrarySchema = z.object({
  filters: z.object({
    name: z.string().optional(),
    categories: z.array(z.number()).default([]),
    genres: z.array(z.number()).default([]),
    themes: z.array(z.number()).default([]),
    gameModes: z.array(z.number()).default([]),
    ratingMin: z
      .number()
      .int()
      .min(MIN_RATING)
      .max(MAX_RATING)
      .default(MIN_RATING),
    ratingMax: z
      .number()
      .int()
      .min(MIN_RATING)
      .max(MAX_RATING)
      .default(MAX_RATING),
    status: z.nativeEnum(GameStatus).optional(),
    userRatingMax: z
      .number()
      .int()
      .min(MIN_USER_RATING)
      .max(MAX_USER_RATING)
      .default(MAX_USER_RATING),
    userRatingMin: z
      .number()
      .int()
      .min(MIN_USER_RATING)
      .max(MAX_USER_RATING)
      .default(MIN_USER_RATING),
  }),
  sort: z.object({
    field: z.nativeEnum(LibrarySortFields).default(LibrarySortFields.RATING),
    order: z.nativeEnum(SortFieldsOrder).default(SortFieldsOrder.DESC),
  }),
  paginate: z.object({
    limit: z.number().int().default(GAMES_LIMIT),
    offset: z.number().int().default(0),
  }),
});

export const normalizeLibraryGameProperties = (game: LibraryGame) => ({
  ...game,
  themes: game.themes.split(",").map(Number),
  gameModes: game.gameModes.split(",").map(Number),
  genres: game.genres.split(",").map(Number),
});
