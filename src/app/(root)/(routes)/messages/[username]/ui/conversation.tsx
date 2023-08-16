import { userApi } from "@shared/api";

interface ConversationProps {
  username: string;
}

export const Conversation = ({ username }: ConversationProps) => {
  const { data: conversation, isLoading } =
    userApi.getSingleConversation(username);

  if (isLoading) return <>Loading...</>;

  console.log(conversation);

  return <>conversation</>;
};
