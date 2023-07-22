import { axiosInstance } from "@shared/config";
import { getToken, throwError } from "@shared/lib";
import { useQuery } from "@tanstack/react-query";
import { MAX_RATING, MIN_RATING } from "./lib";
import { GameFilters, GameGenre, SortFields, SortFieldsOrder } from "./types";

export const useGames = (
  filters: GameFilters = {
    category: [],
    genre: [],
    theme: [],
    name: "",
    ratingMin: MIN_RATING,
    ratingMax: MAX_RATING,
  },
  sort: { field: SortFields; order: SortFieldsOrder } = {
    field: SortFields.RATING,
    order: SortFieldsOrder.DESC,
  }
) =>
  useQuery(["browse_games", { filters, sort }], {
    queryFn: async () => {
      const token = await getToken();
      const { data } = await axiosInstance.post("/games", ``, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

export const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      try {
        // const token = await getToken();
				// console.log(token);
				
        // const { data } = await axiosInstance.post<GameGenre[]>(
        //   "/genres",
        //   `fields *`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // return data;
				return {}
      } catch (error) {
        return throwError(error);
      }
    },
  });

export const gamesApi = {
  getGames: useGames,
  getGenres: useGenres,
};
