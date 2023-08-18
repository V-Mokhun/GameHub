"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FullConversation, FullMessage } from "./types";
import { useRouter } from "next/navigation";
import { MESSAGES_ROUTE } from "@shared/consts";

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

export const useSingleConversation = (username: string) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  return useQuery(
    ["conversations", { id: userId, username }],
    async () => {
      const { data } = await axios.get<FullConversation | null>(
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

export const useMessages = (conversationId?: string) => {
  const { userId } = useAuth();
  const { toast } = useToast();

  return useQuery(
    ["messages", { id: userId, conversationId }],
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

export const useSendMessage = (username: string) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const queryKey = ["messages", { id: user?.id, username }];

  return useMutation({
    mutationKey: ["send-message", { id: user?.id, username }],
    mutationFn: async (data: {
      image?: string;
      message?: string;
      conversationId?: string;
    }) => {
      const { data: newMessage } = await axios.post<FullMessage>(
        `/api/user/messages/${username}`,
        data
      );

      return newMessage;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const previousMessages: FullMessage[] | undefined =
        queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: FullMessage[] | undefined) => {
        const sender = {
          createdAt: user!.createdAt || new Date(),
          email: "",
          id: user!.id,
          imageUrl: user!.imageUrl,
          isPrivateLibrary: user!.unsafeMetadata.isPrivateLibrary,
          updatedAt: user!.updatedAt || new Date(),
          username: user!.username,
        };
        const message = {
          body: data.message || "",
          image: data.image || "",
          senderId: user?.id!,
          conversationId: data.conversationId!,
          createdAt: new Date(),
          id: "new-message",
          sender,
          seenBy: [sender],
        };

        if (!old) {
          return [message];
        } else {
          return [...old, message];
        }
      });

      return { previousMessages };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousMessages);
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
