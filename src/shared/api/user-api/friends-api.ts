import { FriendRequest, Game, User } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GameFriend, OwnProfile } from "./types";
import { useAuth } from "@clerk/nextjs";
import { normalizeLibraryGameProperties } from "../user-library-api";

type GameFriendsResponse = Omit<GameFriend, "game"> & { game: Game };

export const useGameFriends = (gameId: string) => {
  const { userId } = useAuth();

  return useQuery(
    ["game-friends", { gameId, userId }],
    async (): Promise<GameFriend[]> => {
      const { data } = await axios.post<GameFriendsResponse[]>(
        `/api/game/${gameId}/friends`,
        {
          userId,
        }
      );

      const normalizedData = data.map((friend) => ({
        ...friend,
        game: normalizeLibraryGameProperties(friend.game),
      }));

      return normalizedData;
    }
  );
};

export const useSendFriendRequest = () => {
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

export const useCancelFriendRequest = () => {
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

export const useAcceptFriendRequest = () => {
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

export const useRemoveFriend = () => {
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
