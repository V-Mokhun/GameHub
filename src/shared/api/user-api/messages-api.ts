"use client";

import { useAuth } from "@clerk/nextjs";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FullConversation } from "./types";

export const useConversations = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  return useQuery(
    ["conversations", { id: userId }],
    async () => {
      const { data } = await axios.get<FullConversation[]>(
        "/api/user/conversations"
      );

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
  const { toast } = useToast();
  
  return useQuery(
    ["conversation", { username }],
    async () => {
      const { data } = await axios.get<FullConversation>(
        `/api/user/conversations/${username}`
      );

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
      },
    }
  );
};
