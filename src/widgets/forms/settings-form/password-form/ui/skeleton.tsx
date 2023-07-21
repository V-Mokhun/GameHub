import { Skeleton } from "@shared/ui";

export const PasswordFormSkeleton = () => {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="space-y-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
