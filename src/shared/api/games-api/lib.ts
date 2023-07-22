import { GAMES_LIMIT, MAX_RATING, MIN_RATING } from ".";
import {
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

export const stringifyParams = (
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
  const fields = `fields *;`;
  const filterQuery = `where (name ~ *"${
    filters.name
  }"* & category = (${filters.categories?.join(", ")}) 
  & genre = (${filters.genres?.join(",")}) 
  & theme = (${filters.themes?.join(",")}) 
  & rating >= ${filters.ratingMin} & rating <= ${filters.ratingMax})
  );`;
  const sortQuery = `sort ${sort.field} ${sort.order};`;
  const paginateQuery = `limit ${paginate.limit}; offset ${paginate.offset};`;

  const body = `${fields} ${filterQuery} ${sortQuery} ${paginateQuery}`;
};
