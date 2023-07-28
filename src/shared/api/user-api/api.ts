import { User } from "@prisma/client";
import { displayError } from "@shared/lib";
import { useToast } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (username: string) => {
  const { toast } = useToast();

  return useQuery(
    [`user`, username],
    async () => {
      const { data } = await axios.get<User>(`/api/user/${username}`);

      return data;
    },
    {
      onError: (error) => {
        displayError(toast, error);
      },
    }
  );
};

export const userApi = {
  getUser: useUser,
};
