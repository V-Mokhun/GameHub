"use client";

import { SETTINGS_ROUTE } from "@shared/consts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Subtitle,
  Title,
  buttonVariants,
} from "@shared/ui";
import { format } from "date-fns";
import Link from "next/link";

interface UserViewProps {
  data?: {
    imageUrl: string;
    username: string;
    createDate: Date;
    isOwnProfile: boolean;
  };
}

export const UserView = ({ data }: UserViewProps) => {
  if (!data) return null;
  const { imageUrl, username, createDate, isOwnProfile } = data;

  return (
    <div className="flex gap-4 items-start">
      <Avatar className="w-28 h-28 md:w-36 md:h-36">
        <AvatarImage src={imageUrl} />
        <AvatarFallback />
      </Avatar>
      <div className="min-w-0">
        <Title>{username}</Title>
        <Subtitle>
          GameHub member since {format(new Date(createDate), "MMM YYY")}
        </Subtitle>
        {isOwnProfile && (
          <Link className={buttonVariants()} href={SETTINGS_ROUTE}>
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
};
