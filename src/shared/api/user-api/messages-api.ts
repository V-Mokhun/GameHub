"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { MESSAGES_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { FullConversation, FullMessage } from "./types";

export const useConversations = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  return useQuery(
    ["conversations", { id: userId }],
    async () => {
      const { data } = await axios.get<
        (FullConversation & { messages: FullMessage[] })[]
      >("/api/user/conversations");

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
      },
    }
  );
};

export type SingleConversationApiResponse = {
  conversation: FullConversation | null;
  user: User;
};

export const useSingleConversation = (username: string) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    ["conversations", { id: userId, username }],
    async () => {
      const { data } = await axios.get<SingleConversationApiResponse>(
        `/api/user/conversations/${username}`
      );

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
        router.push(MESSAGES_ROUTE);
      },
    }
  );
};

export const useMessages = (username: string, conversationId?: string) => {
  const { userId } = useAuth();
  const { toast } = useToast();

  return useQuery(
    ["messages", { id: userId, username }],
    async () => {
      const { data } = await axios.post<FullMessage[]>(`/api/user/messages`, {
        conversationId,
      });

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
      },
      enabled: !!conversationId,
    }
  );
};

export const useUnseenMessagesCount = () => {
  const { userId } = useAuth();

  return useQuery(["unseen-messages-count", { id: userId }], async () => {
    const { data } = await axios.get<number>(`/api/user/messages/unseen`);

    return data;
  });
};

export const useSendMessage = (username: string) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["send-message", { id: user?.id }],
    mutationFn: async (data: {
      image?: string;
      message?: string;
      conversationId?: string;
      replyingMessage: FullMessage | null;
    }) => {
      const { data: resp } = await axios.post(
        `/api/user/messages/${username}`,
        data
      );

      return resp;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", { id: user?.id, username }],
      });
      const previousMessages: FullMessage[] | undefined =
        queryClient.getQueryData(["messages", { id: user?.id, username }]);

      queryClient.setQueryData(
        ["messages", { id: user?.id, username }],
        (old: FullMessage[] | undefined) => {
          const sender = {
            createdAt: user!.createdAt || new Date(),
            email: "",
            id: user!.id,
            imageUrl: user!.imageUrl,
            isPrivateLibrary: user!.unsafeMetadata.isPrivateLibrary,
            updatedAt: user!.updatedAt || new Date(),
            username: user!.username!,
          };

          const message = {
            body: data.message || "",
            image: data.image || "",
            senderId: user?.id!,
            conversationId: data.conversationId!,
            createdAt: new Date(),
            id: nanoid(10),
            sender,
            seenBy: [sender],
            isSending: true,
            replyingTo: data.replyingMessage ? [data.replyingMessage] : [],
          };

          if (!old) {
            return [message];
          } else {
            return [...old, message];
          }
        }
      );

      return { previousMessages };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["messages", { id: user?.id, username }],
        context?.previousMessages
      );
    },
    onSettled: (data, error, variables, context) => {
      if (
        !context?.previousMessages ||
        context?.previousMessages?.length === 0
      ) {
        queryClient.invalidateQueries({
          queryKey: ["conversations", { id: user?.id, username }],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["messages", { id: user?.id, username }],
      });
    },
  });
};
