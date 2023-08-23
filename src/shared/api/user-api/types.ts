import { Conversation, FriendRequest, Message, User } from "@prisma/client";

export type UserWithFriends = User & { friends: User[] };

export type FullFriendRequest = FriendRequest & {
  sender?: UserWithFriends;
  receiver?: UserWithFriends;
};

export type OwnProfile = User & {
  friends: User[];
  sentFriendRequests: FullFriendRequest[];
  receivedFriendRequests: FullFriendRequest[];
};

export type FullMessage = Message & {
  sender: User;
  seenBy: User[];
  replyingTo?: Message & { sender: User };
  isSending?: boolean;
};

export type FullConversation = Conversation & {
  users: User[];
};
