import { DEFAULT_FILTERS, SortFieldsOrder } from "../games-api";
import {
  LibraryGameFilters,
  LibraryGameSorts,
  LibrarySortFields,
} from "./types";

export const MIN_USER_RATING = 1;
export const MAX_USER_RATING = 10;

export const DEFAULT_LIBRARY_FILTERS: LibraryGameFilters = {
  ...DEFAULT_FILTERS,
  status: undefined,
  userRatingMax: MAX_USER_RATING,
  userRatingMin: MIN_USER_RATING - 1,
};

export const DEFAULT_LIBRARY_SORT: LibraryGameSorts = {
  field: LibrarySortFields.USER_RATING,
  order: SortFieldsOrder.DESC,
};
