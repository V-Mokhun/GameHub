import { User } from "@prisma/client";
import { HOME_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DEFAULT_PAGINATE, Paginate } from "../games-api";

type UseUserApiResponse = {
  user: User & { _count: { library: number } };
  isOwnProfile: boolean;
  libraryIncluded: boolean;
};

const useUser = (username?: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    [`user`, { username }],
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
      enabled: !!username,
    }
  );
};

const useUsers = (search?: string, paginate = DEFAULT_PAGINATE) => {
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    [`users`],
    async () => {
      const { data } = await axios.post<(User & { isFriend: boolean })[]>(
        `/api/user`,
        { search, ...paginate }
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
  getUsers: useUsers,
};
