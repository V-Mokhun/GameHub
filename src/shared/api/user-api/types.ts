import { FriendRequest, User } from "@prisma/client";

export type UserWithFriends = User & { friends: User[] };

export type OwnProfile = User & {
  friends: User[];
  sentFriendRequests: FriendRequest[];
  receivedFriendRequests: FriendRequest[];
};
