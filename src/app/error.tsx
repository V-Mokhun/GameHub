"use client";

import { HOME_ROUTE } from "@shared/consts";
import { Button, Icon, Logo, Title } from "@shared/ui";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex w-full h-full bg-primary flex-col items-center justify-center relative py-10 px-6 lg:o-0 text-background dark:text-foreground bg-gradient-to-br from-primary from-40% to-secondary to-[125%]">
      <Logo className="mb-2" />
      <div className="py-4 text-center max-w-xl mx-auto">
        <Title size="large" className="mb-6">
          Oops! It&apos;s not you, it&apos;s us. We are having some issues,
          please come back soon.
        </Title>
        <p className="mb-4 text-lg">Error message: {error.message}</p>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button onClick={reset} variant="secondary">Try to fix it</Button>
          <Link
            href={HOME_ROUTE}
            className="text-white opacity-70 uppercase tracking-wide font-semibold text-xl hover:opacity-100 transition-opacity"
          >
            Go back home{" "}
            <Icon name="ArrowRight" className="inline-block ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
