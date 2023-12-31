"use client";

import { useUser } from "@clerk/nextjs";
import { cn } from "@shared/lib";
import { useClickOutside } from "@shared/lib/hooks";
import { Logo, Overlay, Skeleton } from "@shared/ui";
import { useSidebarStore } from "../model";
import { SidebarMenu } from "./sidebar-menu";

const SidebarItemSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="h-5 w-5 rounded-md" />
    <Skeleton className="w-28 h-6" />
  </div>
);

const SidebarSectionSkeleton = () => (
  <>
    <Skeleton className="w-20 h-6 mb-4" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <SidebarItemSkeleton key={i} />
      ))}
    </div>
  </>
);

export const Sidebar = () => {
  const { user, isLoaded } = useUser();
  const isOpen = useSidebarStore((state) => state.isOpen);
  const onClose = useSidebarStore((state) => state.onClose);
  const ref = useClickOutside(onClose);

  let content = (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <SidebarSectionSkeleton key={i} />
      ))}
    </div>
  );

  if (isLoaded)
    content = (
      <SidebarMenu onClose={onClose} id={user?.id} username={user?.username} />
    );

  return (
    <>
      <Overlay isOpen={isOpen} />
      <nav
        ref={ref}
        className={cn(
          "fixed left-0 top-0 md:pt-16 md:z-20 z-30 shadow-xl dark:shadow-zinc-600 shadow-zinc-400 w-[230px] md:w-[190px] h-screen overflow-hidden flex flex-col transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="bg-background p-4 md:p-4 md:pb-20 flex-auto overflow-y-auto h-full">
          <Logo className="block md:hidden mb-6" />
          {content}
        </div>
      </nav>
    </>
  );
};
