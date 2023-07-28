import { Game, User } from "@prisma/client";
import { HOME_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type UseUserApiResponse =
  | {
      user: User & { _count: { library: number } };
      isOwnProfile: false;
      libraryIncluded: false;
    }
  | {
      user: User & { _count: { library: number }; library: Game[] };
      isOwnProfile: boolean;
      libraryIncluded: true;
    }
  | {
      user: User & { _count: { library: number }; library: Game[] };
      isOwnProfile: true;
      libraryIncluded: true;
    };

const useUser = (username: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    [`user`, username],
    async () => {
      const { data } = await axios.get<UseUserApiResponse>(
        `/api/user/${username}`
      );

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
    }
  );
};

export const userApi = {
  getUser: useUser,
};
