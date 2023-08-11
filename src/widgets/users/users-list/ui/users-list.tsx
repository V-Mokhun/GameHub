"use client";

import { User } from "@prisma/client";
import { PROFILE_ROUTE, USERS_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import {
  Avatar,
  AvatarImage,
  Button,
  Icon,
  Subtitle,
  Title,
  Link,
} from "@shared/ui";
import NextLink from "next/link";

interface UsersListProps {
  users?: (User & { isFriend: boolean; friends: User[] })[];
  isLoading: boolean;
}

export const UsersList = ({ users, isLoading }: UsersListProps) => {
  if (isLoading) return null;

  return users && users.length > 0 ? (
    <ul className="flex flex-col gap-4">
      {users.map((user) => (
        <li key={user.id} className="flex items-start gap-4">
          <NextLink href={PROFILE_ROUTE(user.username!)}>
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.imageUrl} />
            </Avatar>
          </NextLink>
          <div className="min-w-0">
            <Link
              className="text-foreground"
              href={PROFILE_ROUTE(user.username!)}
            >
              <Title size="small">{user.username}</Title>
            </Link>
            <Subtitle className="md:mb-0 mb-0J">
              Friends: {user.friends.length ?? 0}
            </Subtitle>
          </div>
          <div className="flex items-center self-stretch">
            <Button
              className={cn(
                user.isFriend && "bg-destructive hover:bg-destructive-hover"
              )}
              size="icon"
            >
              <Icon
                className="text-white"
                name={user.isFriend ? "UserX" : "UserCheck"}
              />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <Title>No users found</Title>
  );
};
