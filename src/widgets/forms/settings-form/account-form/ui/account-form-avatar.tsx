"use client";

import { isDefaultAvatar } from "@shared/lib";
import { Avatar, AvatarFallback, AvatarImage, Button, Icon } from "@shared/ui";

interface AccountFormAvatarProps {
  imageRef: React.MutableRefObject<HTMLInputElement | null>;
  imagePreview: string;
  isLoaded: boolean;
  onDeleteImage: () => void;
}

export const AccountFormAvatar = ({
  imagePreview,
  imageRef,
  isLoaded,
  onDeleteImage,
}: AccountFormAvatarProps) => {
  return (
    <div className="relative w-fit">
      <Avatar
        onClick={() => {
          if (imageRef.current) imageRef.current.click();
        }}
        className="w-36 h-36"
      >
        <AvatarImage src={imagePreview} />
        <AvatarFallback />
      </Avatar>
      <Button
        variant="destructive"
        size="icon"
        type="button"
        className="absolute z-[2] right-0 top-0 "
        disabled={isDefaultAvatar(imagePreview) || !isLoaded}
        onClick={onDeleteImage}
      >
        <Icon className="text-white font-bold" size={24} name="Trash" />
      </Button>
    </div>
  );
};
