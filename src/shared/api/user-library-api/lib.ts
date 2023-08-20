import { GameStatus, Game as LibraryGame } from "@prisma/client";
import { ReadonlyURLSearchParams } from "next/navigation";
import { z } from "zod";
import { GAMES_LIMIT } from "../consts";
import { MAX_RATING, MIN_RATING, SortFieldsOrder } from "../games-api";
import {
  DEFAULT_LIBRARY_FILTERS,
  DEFAULT_LIBRARY_SORT,
  MAX_USER_RATING,
  MIN_USER_RATING,
} from "./consts";
import {
  LibraryGameFilters,
  LibraryGameSorts,
  LibrarySortFields,
} from "./types";

export const libraryGameSchema = z.object({
  id: z.number(),
  name: z.string(),
  totalRating: z.number(),
  coverUrl: z.string(),
  releaseDate: z.string().datetime().nullable(),
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
      .min(MIN_USER_RATING - 1)
      .max(MAX_USER_RATING)
      .default(MIN_USER_RATING - 1),
    userRatingMin: z
      .number()
      .int()
      .min(MIN_USER_RATING - 1)
      .max(MAX_USER_RATING)
      .default(MAX_USER_RATING),
  }),
  sort: z.object({
    field: z.nativeEnum(LibrarySortFields).default(LibrarySortFields.RATING),
    order: z.nativeEnum(SortFieldsOrder).default(SortFieldsOrder.DESC),
  }),
  paginate: z.object({
    limit: z.number().int().default(GAMES_LIMIT),
    offset: z.number().int().default(0),
  }),
  noLimit: z.boolean().default(false),
});

export const normalizeLibraryGameProperties = (game: LibraryGame) => ({
  ...game,
  themes: game.themes.split(",").map(Number),
  gameModes: game.gameModes.split(",").map(Number),
  genres: game.genres.split(",").map(Number),
});

export const stringifyLibraryFilters = (
  params: ReadonlyURLSearchParams,
  filters: LibraryGameFilters
) => {
  const current = new URLSearchParams(Array.from(params.entries()));

  for (const key of Object.keys(filters) as Array<keyof typeof filters>) {
    if (!filters[key]) {
      current.delete(key);
      continue;
    }

    if (
      key === "categories" ||
      key === "genres" ||
      key === "themes" ||
      key === "gameModes"
    ) {
      if (filters[key].length > 0) current.set(key, filters[key].join(","));
      else current.delete(key);
    } else {
      if (filters[key] === DEFAULT_LIBRARY_FILTERS[key]) current.delete(key);
      else current.set(key, String(filters[key]));
    }
  }

  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};

export const retrieveLibraryFiltersFromSearchParams = (
  params: ReadonlyURLSearchParams
): { filters: LibraryGameFilters; isDefault: boolean } => {
  const filters = { ...DEFAULT_LIBRARY_FILTERS };
  let isDefault = true;
  for (let key of Object.keys(filters) as Array<keyof typeof filters>) {
    if (params.has(key)) {
      const value = params.get(key);
      if (
        key === "categories" ||
        key === "genres" ||
        key === "themes" ||
        key === "gameModes"
      ) {
        filters[key] = value?.split(",").map(Number) ?? [];
        isDefault = false;
      } else if (
        key === "ratingMin" ||
        key === "ratingMax" ||
        key === "userRatingMax" ||
        key === "userRatingMin"
      ) {
        filters[key] = Number(value);
        if (filters[key] !== DEFAULT_LIBRARY_FILTERS[key]) {
          isDefault = false;
        }
      } else if (key === "status") {
        filters[key] = value as GameStatus;
        if (filters[key] !== DEFAULT_LIBRARY_FILTERS[key]) {
          isDefault = false;
        }
      } else {
        filters[key] = value || "";
        if (value !== "") {
          isDefault = false;
        }
      }
    }
  }

  return { filters, isDefault };
};

export const retrieveLibrarySortFromSearchParams = (
  params: ReadonlyURLSearchParams
): LibraryGameSorts => {
  const sort = { ...DEFAULT_LIBRARY_SORT };
  for (const key of Object.keys(sort) as Array<keyof typeof sort>) {
    if (params.has(key)) {
      const value = params.get(key);
      if (key === "order") {
        sort[key] = value as SortFieldsOrder;
      } else {
        sort[key] = value as LibrarySortFields;
      }
    }
  }

  return sort;
};
