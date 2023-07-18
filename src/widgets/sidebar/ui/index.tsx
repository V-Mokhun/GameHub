import { auth } from "@clerk/nextjs";
import { Logo } from "@shared/ui";
import { SidebarMenu } from "./sidebar-menu";

export const Sidebar = async () => {
  const { userId } = auth();

  return (
    <div className="fixed left-0 top-16 shadow-lg w-[240px] h-screen overflow-hidden flex flex-col">
      <div className="bg-background p-4 md:p-6 flex-auto overflow-y-auto h-full">
        <Logo className="md:hidden" />
        <SidebarMenu userId={userId} />
      </div>
    </div>
  );
};
