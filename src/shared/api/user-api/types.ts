import { FriendRequest, User } from "@prisma/client";

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
