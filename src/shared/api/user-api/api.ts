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

const useOwnProfile = (id?: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    [`own-profile`, { id }],
    async () => {
      const { data } = await axios.get<OwnProfile>(`/api/user/own-profile`);

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(HOME_ROUTE);
      },
      enabled: !!id,
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
      refetchOnWindowFocus: false,
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
  const queryClient = useQueryClient();
  return useMutation<
    FriendRequest,
    unknown,
    { senderUsername: string; receiverUsername: string }
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
      onSettled: () => {
        queryClient.invalidateQueries(["own-profile"]);
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
};
