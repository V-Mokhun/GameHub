import { User } from "@prisma/client";
import { HOME_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DEFAULT_PAGINATE } from "../games-api";

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

type UseUsersApiResponse = {
  users: (User & { isFriend: boolean; friends: User[] })[];
  count: number;
};
const useUsers = (search?: string, paginate = DEFAULT_PAGINATE) => {
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    [`users`, { search, ...paginate }],
    async () => {
      const { data } = await axios.post<UseUsersApiResponse>(`/api/user`, {
        search,
        ...paginate,
      });

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
};

export const userApi = {
  getUser: useUser,
  getUsers: useUsers,
};
