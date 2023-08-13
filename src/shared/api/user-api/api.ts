import { FriendRequest, User } from "@prisma/client";
import { HOME_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DEFAULT_PAGINATE } from "../games-api";
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

const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    FriendRequest,
    unknown,
    { senderUsername: string; receiverUsername: string; id: string },
    { previousData?: unknown }
  >(
    ["send-friend-request"],
    async ({ receiverUsername, senderUsername }) => {
      const { data } = await axios.post<FriendRequest>(
        `/api/user/${senderUsername}/friends/send-request`,
        { receiverUsername }
      );
      return data;
    },
    {
      onMutate: async ({ receiverUsername, senderUsername, id }) => {
        await queryClient.cancelQueries({
          queryKey: ["own-profile", { id }],
        });

        const previousData = queryClient.getQueryData(["own-profile", { id }]);

        queryClient.setQueryData(
          ["own-profile", { id }],
          (old: OwnProfile | undefined) =>
            old
              ? {
                  ...old,
                  sentFriendRequests: [
                    ...(old?.sentFriendRequests || []),
                    { receiverUsername, senderUsername, createdAt: new Date() },
                  ],
                }
              : old
        );

        return { previousData };
      },
      onError: (err, { id }, context) => {
        queryClient.setQueryData(
          ["own-profile", { id }],
          context?.previousData
        );
        displayError(toast, err, "Failed to send a friend request");
      },
      onSettled: (_, __, { id }) => {
        queryClient.invalidateQueries(["own-profile", { id }]);
      },
    }
  );
};

const useCancelFriendRequest = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<
    FriendRequest,
    unknown,
    { senderUsername: string; receiverUsername: string; id: string },
    { previousData?: unknown }
  >(
    ["cancel-friend-request"],
    async ({ receiverUsername, senderUsername }) => {
      const { data } = await axios.patch<FriendRequest>(
        `/api/user/${senderUsername}/friends/cancel-request`,
        { receiverUsername }
      );
      return data;
    },
    {
      onMutate: async ({ receiverUsername, senderUsername, id }) => {
        await queryClient.cancelQueries({
          queryKey: ["own-profile", { id }],
        });

        const previousData = queryClient.getQueryData(["own-profile", { id }]);

        queryClient.setQueryData(
          ["own-profile", { id }],
          (old: OwnProfile | undefined) =>
            old
              ? {
                  ...old,
                  sentFriendRequests: old.sentFriendRequests.filter(
                    (req) =>
                      req.receiverUsername !== receiverUsername ||
                      req.senderUsername !== senderUsername
                  ),
                }
              : old
        );

        return { previousData };
      },
      onError: (err, { id }, context) => {
        queryClient.setQueryData(
          ["own-profile", { id }],
          context?.previousData
        );
        displayError(toast, err, "Failed to cancel a friend request");
      },
      onSettled: (_, __, { id }) => {
        queryClient.invalidateQueries(["own-profile", { id }]);
      },
    }
  );
};

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    unknown,
    { username: string; friendUsername: string; id: string }
  >(
    ["accept-friend-request"],
    async ({ friendUsername, username }) => {
      const { data } = await axios.patch<User>(
        `/api/user/${username}/friends/accept-request`,
        { friendUsername }
      );
      return data;
    },
    {
      onSettled: (_, __, { id, username }) => {
        queryClient.invalidateQueries(["own-profile", { id }]);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["user", { username }]);
      },
    }
  );
};

const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    unknown,
    { username: string; friendUsername: string; id: string }
  >(
    ["remove-friend"],
    async ({ friendUsername, username }) => {
      const { data } = await axios.patch<User>(
        `/api/user/${username}/friends/remove`,
        { friendUsername }
      );
      return data;
    },
    {
      onSettled: (_, __, { id, username }) => {
        queryClient.invalidateQueries(["own-profile", { id }]);
        queryClient.invalidateQueries(["user", { username }]);
        queryClient.invalidateQueries(["users"]);
      },
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
};
