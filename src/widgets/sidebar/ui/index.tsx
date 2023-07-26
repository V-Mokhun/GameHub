"use client";

import { useAuth } from "@clerk/nextjs";
import { cn, useClickOutside } from "@shared/lib";
import { Logo, Overlay } from "@shared/ui";
import { useSidebarStore } from "../model";
import { SidebarMenu } from "./sidebar-menu";

export const Sidebar = () => {
  const { userId } = useAuth();
  const isOpen = useSidebarStore((state) => state.isOpen);
  const onClose = useSidebarStore((state) => state.onClose);
  const ref = useClickOutside(onClose);

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
          {/* {content} */}
          <SidebarMenu onClose={onClose} userId={userId} />
        </div>
      </nav>
    </>
  );
};
