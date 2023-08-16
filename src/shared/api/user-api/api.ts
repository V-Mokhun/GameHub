import { User } from "@prisma/client";
import { HOME_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DEFAULT_PAGINATE } from "../games-api";
import {
  useAcceptFriendRequest,
  useCancelFriendRequest,
  useRemoveFriend,
  useSendFriendRequest,
} from "./friends-api";
import { useConversations, useSingleConversation } from "./messages-api";
import { OwnProfile, UserWithFriends } from "./types";

type UseUserApiResponse = {
  user: User & {
    friends: UserWithFriends[];
    _count: { library: number; friends: number };
  };
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

const useOwnProfile = (
  id?: string,
  options: { enabled?: boolean; includeFullRequests?: boolean } = {
    enabled: true,
    includeFullRequests: false,
  }
) => {
  const { toast } = useToast();
  const router = useRouter();
  if (!options.enabled) options.enabled = true;
  if (!options.includeFullRequests) options.includeFullRequests = false;

  return useQuery(
    [`own-profile`, { id, includeFullRequests: options.includeFullRequests }],
    async () => {
      const { data } = await axios.post<OwnProfile>(`/api/user/own-profile`, {
        includeFullRequests: options.includeFullRequests,
      });

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
      enabled: !!id && options.enabled,
    }
  );
};

type UseUsersApiResponse = {
  users: (UserWithFriends & { isFriend: boolean })[];
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
      keepPreviousData: true,
    }
  );
};

export const userApi = {
  getUser: useUser,
  getOwnProfile: useOwnProfile,
  getUsers: useUsers,
  sendFriendRequest: useSendFriendRequest,
  cancelFriendRequest: useCancelFriendRequest,
  acceptFriendRequest: useAcceptFriendRequest,
  removeFriend: useRemoveFriend,
  getConversations: useConversations,
  getSingleConversation: useSingleConversation,
};
