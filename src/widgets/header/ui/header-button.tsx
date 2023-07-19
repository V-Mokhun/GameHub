"use client";

import { Icon } from "@shared/ui";
import { useSidebarStore } from "@widgets/sidebar";

export const HeaderButton = ({}) => {
  const openSidebar = useSidebarStore((state) => state.onOpen);

  return (
    <button onClick={openSidebar} type="button" className="md:hidden font-bold">
      <Icon size={30} name="Menu" />
    </button>
  );
};
