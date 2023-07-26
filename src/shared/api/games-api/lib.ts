import { ReadonlyURLSearchParams } from "next/navigation";
import { DEFAULT_FILTERS, DEFAULT_PAGINATE, DEFAULT_SORT } from ".";
import { UseGamesApiResponse } from "./api";
import {
  Game,
  GameFilters,
  GamePaginate,
  GameSorts,
  ImageTypes,
  SortFields,
  SortFieldsOrder,
} from "./types";

export const getGameImageUrl = (
  imageId: string,
  imageType: ImageTypes = ImageTypes.BIG_COVER
) => {
  return `${process.env.NEXT_PUBLIC_GAMES_IMAGES_URL}/t_${imageType}/${imageId}.jpg`;
};

export const normalizeGameProperties = (game: UseGamesApiResponse): Game => {
  return {
    id: game.id,
    name: game.name,
    rating: Math.ceil(game.total_rating),
    category: game.category,
    themes: game.themes,
    gameModes: game.game_modes,
    genres: game.genres,
    cover: game.cover?.image_id ? getGameImageUrl(game?.cover?.image_id) : "",
    releaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000)
      : undefined,
  };
};

export const stringifyFilters = (
  params: ReadonlyURLSearchParams,
  filters: GameFilters
) => {
  const current = new URLSearchParams(Array.from(params.entries()));

  for (let key of Object.keys(filters) as Array<keyof typeof filters>) {
    if (
      key === "categories" ||
      key === "genres" ||
      key === "themes" ||
      key === "gameModes"
    ) {
      if (filters[key].length > 0) current.set(key, filters[key].join(","));
      else current.delete(key);
    } else {
      current.set(key, String(filters[key]));
    }
  }

  const search = current.toString();
  const query = search ? `?${search}` : "";

  return query;
};

export const retrieveFiltersFromSearchParams = (
  params: ReadonlyURLSearchParams
): { filters: GameFilters; isDefault: boolean } => {
  const filters = { ...DEFAULT_FILTERS };
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
      } else if (key === "ratingMin" || key === "ratingMax") {
        filters[key] = Number(value);
        if (filters[key] !== DEFAULT_FILTERS[key]) {
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

export const retrieveSortFromSearchParams = (
  params: ReadonlyURLSearchParams
): GameSorts => {
  const sort = { ...DEFAULT_SORT };
  for (const key of Object.keys(sort) as Array<keyof typeof sort>) {
    if (params.has(key)) {
      const value = params.get(key);
      if (key === "order") {
        sort[key] = value as SortFieldsOrder;
      } else {
        sort[key] = value as SortFields;
      }
    }
  }

  return sort;
};

export const retrievePaginateFromSearchParams = (
  params: ReadonlyURLSearchParams
): GamePaginate => {
  const paginate = { ...DEFAULT_PAGINATE };
  for (const key of Object.keys(paginate) as Array<keyof typeof paginate>) {
    if (params.has(key)) {
      const value = params.get(key);
      paginate[key] = Number(value);
    }
  }

  return paginate;
};

export const stringifyGetGamesParams = (
  params: {
    filters: GameFilters;
    sort: GameSorts;
    paginate: GamePaginate;
  } = {
    filters: DEFAULT_FILTERS,
    sort: DEFAULT_SORT,
    paginate: DEFAULT_PAGINATE,
  }
) => {
  const { filters, paginate, sort } = params;

  const fields = `fields name, cover.image_id, first_release_date, total_rating, category, themes, game_modes, genres;`;
  const filterQuery = `where name ~ *"${filters.name}"*
  ${
    filters.categories.length > 0
      ? `& category = (${filters.categories?.join(", ")})`
      : ""
  } 
  ${
    filters.genres.length > 0
      ? `& genres = (${filters.genres?.join(", ")})`
      : ""
  }
  ${
    filters.themes.length > 0
      ? `& themes = (${filters.themes?.join(", ")})`
      : ""
  } 
  ${
    filters.gameModes.length > 0
      ? `& game_modes = (${filters.gameModes?.join(", ")})`
      : ""
  } 
  & total_rating >= ${filters.ratingMin} & total_rating <= ${
    filters.ratingMax
  };`;
  const sortQuery = `sort ${sort.field} ${sort.order};`;
  const paginateQuery = `limit ${paginate.limit}; offset ${paginate.offset};`;

  const body = `${fields} ${filterQuery} ${sortQuery} ${paginateQuery}`;
  return body;
};

export const stringifyGetGameByIdParams = (id: number) => {
  const fields = `fields name, cover.image_id, first_release_date, total_rating, category, themes, game_modes, genres;`;
  const filterQuery = `where id = ${id};`;

  const body = `${fields} ${filterQuery}`;
  return body;
};
