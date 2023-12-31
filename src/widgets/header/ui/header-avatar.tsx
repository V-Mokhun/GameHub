"use client";

import { useUser } from "@clerk/nextjs";
import { ThemeToggler } from "@features/theme-toggler";
import {
  BROWSE_ROUTE,
  LIBRARY_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "@shared/consts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  SignOutButton,
  Skeleton,
} from "@shared/ui";
import Link from "next/link";

interface HeaderAvatarProps {}

export const HeaderAvatar = ({}: HeaderAvatarProps) => {
  const { user, isLoaded } = useUser();

  if ((isLoaded && !user) || !isLoaded)
    return <Skeleton className="w-10 h-10 shrink-0 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger data-testid="avatar-button-dropdown">
        <Avatar>
          <AvatarImage src={user.profileImageUrl} />
          <AvatarFallback />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 md:space-y-0 min-w-[200px]">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.username && (
              <span className="font-medium">{user.username}</span>
            )}
            {user.primaryEmailAddress && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.primaryEmailAddress.emailAddress}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href={PROFILE_ROUTE(user.username!)}>
            <Icon name="User" className="mr-2" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href={LIBRARY_ROUTE(user.username!)}>
            <Icon className="mr-2" name="Library" />
            <span>Library</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={SETTINGS_ROUTE} className="cursor-pointer">
            <Icon className="mr-2" name="Settings" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
          <div className="w-full">
            <ThemeToggler />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <SignOutButton id={user.id} username={user.username!}>
            <div className="flex items-center w-full">
              <Icon className="mr-2" name="LogOut" />
              <span>Sign Out</span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
