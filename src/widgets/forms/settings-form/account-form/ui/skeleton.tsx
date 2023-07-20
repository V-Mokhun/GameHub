"use client";

import { Skeleton } from "@shared/ui";

export const AccountFormSkeleton = () => {
  return (
    <>
      <div className="space-y-4 h-full flex flex-col pb-4 md:pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8 mb-4 md:mb-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-36 w-36 rounded-full" />
            <Skeleton className="w-36 h-10" />
          </div>
          <div className="flex flex-col gap-4 max-w-sm flex-auto">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-11" />
            </div>
          </div>
        </div>
        <div className="max-w-sm flex-1 pb-6">
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 max-w-sm w-full" />
      </div>
    </>
  );
};
