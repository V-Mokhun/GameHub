import {
  Conversation,
  FriendRequest,
  GameReview,
  GameReviewVote,
  Game as LibraryGame,
  Message,
  User,
} from "@prisma/client";
import { NormalizedLibraryGame } from "../user-library-api";

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
  replyingTo: (Message & { sender: User })[];
  isSending?: boolean;
};

export type FullConversation = Conversation & {
  users: User[];
};

export type GameFriend = {
  id: string;
  username: string;
  imageUrl: string;
  game: NormalizedLibraryGame;
};

export type UserReview = GameReview & {
  votes: GameReviewVote[];
  game: Pick<LibraryGame, "id" | "coverUrl" | "name" | "releaseDate">;
};
