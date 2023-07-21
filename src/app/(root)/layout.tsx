"use client";

import { useUser } from "@clerk/nextjs";
import { SETTINGS_ROUTE } from "@shared/consts";
import { Link, buttonVariants, useToast } from "@shared/ui";
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
        const { dismiss } = toast({
          title: "Username has been generated",
          description:
            "Your username has been automatically generated. You can change it in your profile settings.",
          action: (
            <Link
              onClick={() => dismiss()}
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "w-max self-end text-sm hover:text-white",
              })}
              href={SETTINGS_ROUTE}
            >
              Change username
            </Link>
          ),
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
      <main className="h-full px-2 sm:px-4 sm:pb-4 md:px-5 md:pb-5 pt-20 md:pl-[240px]">
        {children}
      </main>
    </>
  );
}
