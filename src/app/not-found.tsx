import { HOME_ROUTE } from "@shared/consts";
import { Icon, Logo, Title } from "@shared/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full h-full bg-primary flex-col items-center justify-center relative py-10 px-6 lg:o-0 text-background dark:text-foreground bg-gradient-to-br from-primary from-40% to-secondary to-[125%]">
      <Logo className="mb-2" />
      <div className="py-4 text-center max-w-xl mx-auto">
        <Title size="huge" className="mb-6">
          Page not found
        </Title>
        <Link
          href={HOME_ROUTE}
          className="text-white opacity-70 uppercase tracking-wide font-semibold text-xl hover:opacity-100 transition-opacity"
        >
          Go back home <Icon name="ArrowRight" className="inline-block ml-1" />
        </Link>
      </div>
    </div>
  );
}
