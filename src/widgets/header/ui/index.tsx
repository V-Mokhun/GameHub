"use client";

import { useAuth } from "@clerk/nextjs";
import { SIGN_IN_ROUTE } from "@shared/consts";
import { Link, Logo, buttonVariants } from "@shared/ui";
import { HeaderAvatar } from "./header-avatar";
import { HeaderButton } from "./header-button";
import { HeaderSearch } from "./header-search";
import { HeaderRequests } from "./header-requests";
import { HeaderMessages } from "./header-messages";

export const Header = () => {
  const { userId } = useAuth();

  return (
    <header className="fixed w-full z-10 md:z-40 bg-primary py-2 md:py-3">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between gap-4 md:gap-3">
          <Logo className="text-white hidden md:flex" />
          <HeaderButton />
          <HeaderSearch />
          {userId ? (
            <div className="flex items-center gap-4">
              <HeaderMessages authUserId={userId} />
              <HeaderRequests authUserId={userId} />
              <HeaderAvatar />
            </div>
          ) : (
            <Link
              href={SIGN_IN_ROUTE}
              className={buttonVariants({
                size: "default",
                variant: "secondary",
                className:
                  "hover:text-secondary-foreground shrink-0 font-bold text-sm md:text-base",
              })}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
