"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { cn, useClickOutside } from "@shared/lib";
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
      <SidebarMenu
        onClose={onClose}
        username={user?.username}
      />
    );

  return (
    <>
      <Overlay isOpen={isOpen} />
      <nav
        ref={ref}
        className={cn(
          "fixed left-0 top-0 md:pt-16 z-30 shadow-xl w-[250px] md:w-[220px] h-screen overflow-hidden flex flex-col transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="bg-background p-4 flex-auto overflow-y-auto h-full">
          <Logo className="block md:hidden mb-6" />
          {content}
        </div>
      </nav>
    </>
  );
};
