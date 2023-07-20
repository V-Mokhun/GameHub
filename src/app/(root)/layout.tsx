"use client";

import { useUser } from "@clerk/nextjs";
import { useToast } from "@shared/ui";
import { Header } from "@widgets/header";
import { Sidebar } from "@widgets/sidebar";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    async function updateUsername() {
      if (isLoaded && user && !user.username) {
        await user.update({ username: nanoid(10) });
        toast({
          title: "Username has been generated",
          description:
            "Your username has been automatically generated. You can change it in your profile settings.",
          variant: "success",
        });
      }
    }

    updateUsername();
  }, [isLoaded, user, toast]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="h-full px-2 pt-16 sm:px-4 sm:pb-4 md:px-5 md:pb-5 md:pt-20 md:pl-[240px]">
        {children}
      </main>
    </>
  );
}
