import { Game as LibraryGame } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { normalizeLibraryGameProperties } from "./lib";

const useLibrary = (userId: number) => {
  const { toast } = useToast();

  return useQuery(
    ["library"],
    async () => {
      const { data } = await axios.get<LibraryGame[]>(
        `/api/user/${userId}/library`
      );
      return data.map(normalizeLibraryGameProperties);
    },
    {
      onError: (error) => {
        return displayError(toast, error);
      },
    }
  );
};

export const userLibraryApi = {
  getUserLibrary: useLibrary,
};
