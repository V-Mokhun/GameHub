import { cn } from "@shared/lib";
import { CldImage } from "next-cloudinary";

interface ConversationReplyBodyProps {
  image?: string;
  username: string;
  body: string;
  className?: string;
}

export const ConversationReplyBody = ({
  image,
  username,
  body,
  className,
}: ConversationReplyBodyProps) => {
  return (
    <div
      className={cn(
        "flex-1 min-w-0 pl-2 relative after:absolute after:top-1 after:bottom-1 after:left-0 after:block after:w-[2px] after:rounded-md after:bg-secondary flex gap-2",
        className
      )}
    >
      {image && (
        <CldImage
          src={image}
          width={32}
          height={32}
          alt="Image"
          className="rounded-sm object-cover h-8 mt-1"
        />
      )}
      <div className="flex flex-col flex-1">
        <p className="text-secondary">{username}</p>
        {image ? <p>Image</p> : <p className="line-clamp-1">{body}</p>}
      </div>
    </div>
  );
};
