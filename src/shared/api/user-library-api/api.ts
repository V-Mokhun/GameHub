import { Game as LibraryGame } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { normalizeLibraryGameProperties } from "./lib";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@shared/consts";
import { NormalizedLibraryGame } from "./types";

const useLibrary = (userId: string) => {
  const router = useRouter();
  const { toast } = useToast();

  return useQuery(
    ["library"],
    async () => {
      const { data } = await axios.get<LibraryGame[]>(
        `/api/user/${userId}/library`
      );

      return data.map(
        normalizeLibraryGameProperties
      ) as NormalizedLibraryGame[];
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
    }
  );
};

export const userLibraryApi = {
  getUserLibrary: useLibrary,
};
