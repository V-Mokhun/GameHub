"use client";

import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import { ThemeToggler } from "@features/theme-toggler";
import { BROWSE_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "@shared/consts";
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
  Skeleton,
} from "@shared/ui";
import Image from "next/image";
import Link from "next/link";

interface HeaderAvatarProps {}

export const HeaderAvatar = ({}: HeaderAvatarProps) => {
  const { user } = useUser();

  if (!user) return <Skeleton className="w-10 h-10 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            <Image
              alt="Avatar"
              src="/images/user1.png"
              width={40}
              height={40}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
          <Link className="cursor-pointer" href={PROFILE_ROUTE(user.id)}>
            <Icon name="User" className="mr-2" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={SETTINGS_ROUTE} className="cursor-pointer">
            <Icon className="mr-2" name="Settings" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href={BROWSE_ROUTE}>
            <Icon className="mr-2" name="Globe" />
            <span>Browse</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
          <div className="w-full">
            <ThemeToggler />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <SignOutButton>
            <div className="flex items-center w-full">
              <Icon className="mr-2" name="LogOut" />
              <span>Sign out</span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
