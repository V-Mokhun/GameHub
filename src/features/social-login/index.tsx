"use client";

import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { HOME_ROUTE, SSO_CALLBACK_ROUTE } from "@shared/consts";
import { cn } from "@shared/lib";
import { Button } from "@shared/ui";
import Image from "next/image";

export const SocialLogin = ({
  className,
  text,
}: {
  text?: string;
  className?: string;
}) => {
  const { signIn, isLoaded } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: SSO_CALLBACK_ROUTE,
      redirectUrlComplete: HOME_ROUTE,
    });
  };

  return (
    <div className={cn("flex flex-col flex-1 space-y-2", className)}>
      <Button
        onClick={() => signInWith("oauth_google")}
        variant="outline"
        className="hover:bg-foreground hover:text-background"
      >
        <Image unoptimized src="/icons/google.svg" alt="Google" width={24} height={24} />
        <span className="ml-2">{text} Google</span>
      </Button>
      <Button
        onClick={() => signInWith("oauth_github")}
        variant="outline"
        className="hover:bg-foreground hover:text-background"
      >
        <Image unoptimized src="/icons/github.svg" alt="Github" width={24} height={24} />
        <span className="ml-2">{text} GitHub</span>
      </Button>
      <Button
        onClick={() => signInWith("oauth_twitch")}
        variant="outline"
        className="hover:bg-purple-600 hover:text-background dark:hover:text-foreground"
      >
        <Image unoptimized src="/icons/twitch.svg" alt="Twitch" width={24} height={24} />
        <span className="ml-2">{text} Twitch</span>
      </Button>
    </div>
  );
};
