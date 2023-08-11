import { User } from "@prisma/client";

export type UserWithFriends = User & { friends: User[] };
