import { GAMES_LIMIT, MAX_RATING, MIN_RATING } from ".";
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
    rating: game.total_rating,
    category: game.category,
    themes: game.themes,
    gameModes: game.game_modes,
    genres: game.genres,
    cover: getGameImageUrl(game.cover.image_id),
    releaseDate: new Date(game.first_release_date * 1000),
  };
};

export const stringifyGetGamesParams = (
  filters: GameFilters = {
    name: "",
    categories: [],
    genres: [],
    themes: [],
    ratingMin: MIN_RATING,
    ratingMax: MAX_RATING,
  },
  sort: GameSorts = {
    field: SortFields.RATING,
    order: SortFieldsOrder.DESC,
  },
  paginate: GamePaginate = {
    limit: GAMES_LIMIT,
    offset: 0,
  }
) => {
  const fields = `fields name, cover.image_id, first_release_date, total_rating, category, themes, game_modes, genres;`;
  const filterQuery = `where name ~ *"${filters.name}"*
  ${
    filters.categories.length > 0
      ? `& category = (${filters.categories?.join(", ")}`
      : ""
  } 
  ${filters.genres.length > 0 ? `& genre = (${filters.genres?.join(", ")}` : ""}
  ${
    filters.themes.length > 0 ? `& theme = (${filters.themes?.join(", ")}` : ""
  } 
  & rating >= ${filters.ratingMin} & rating <= ${filters.ratingMax};`;
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
