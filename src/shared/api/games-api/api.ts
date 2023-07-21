import { useQuery } from "@tanstack/react-query";
import { GameFilters, SortFields, SortFieldsOrder } from "./types";

export const useGames = (
  filters: GameFilters = {
    category: [],
    genre: [],
    theme: [],
    name: "",
    ratingMin: 0,
    ratingMax: 100,
  },
  sortField: SortFields = SortFields.RATING,
  sortOrder: SortFieldsOrder = SortFieldsOrder.DESC
) =>
  useQuery(["browse_games", { filters, sortField, sortOrder }], {
    queryFn: async () => {},
  });

export const gamesApi = {
  getGames: useGames,
};
