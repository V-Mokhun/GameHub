import { auth } from "@clerk/nextjs";
import { SIGN_IN_ROUTE } from "@shared/consts";
import { Link, Logo, buttonVariants } from "@shared/ui";
import { HeaderAvatar } from "./header-avatar";
import { HeaderSearch } from "./header-search";

export const Header = async ({}) => {
  const { userId } = auth();

  return (
    <div className="bg-primary py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          <Logo className="hidden md:flex text-white" />
          <HeaderSearch />
          {userId ? (
            <HeaderAvatar />
          ) : (
            <Link
              href={SIGN_IN_ROUTE}
              className={buttonVariants({
                size: "default",
                variant: "secondary",
                className: "hover:text-secondary-foreground shrink-0 font-bold",
              })}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
