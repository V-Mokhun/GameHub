import { axiosInstance } from "@shared/config";
import { useQuery } from "@tanstack/react-query";
import { MAX_RATING, MIN_RATING } from "./lib";
import { GameFilters, GameGenre, SortFields, SortFieldsOrder } from "./types";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";

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
      // const { data } = await axiosInstance.post("/games", ``, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
    },
  });

export const useGenres = () => {
  const { toast } = useToast();

  return useQuery(
    ["genres"],
    async () => {
      const { data } = await axiosInstance.post<GameGenre[]>(
        "/genres",
        `fields id, name, slug;`
      );
      return data;
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
    }
  );
};

export const gamesApi = {
  getGames: useGames,
  getGenres: useGenres,
};
