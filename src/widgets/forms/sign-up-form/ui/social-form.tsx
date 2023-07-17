"use client";

import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { HOME_ROUTE, SSO_CALLBACK_ROUTE } from "@shared/consts";
import { Button } from "@shared/ui";

interface SocialFormProps {}

export const SocialForm = ({}: SocialFormProps) => {
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
    <div className="flex flex-col flex-1">
      <Button onClick={() => signInWith("oauth_google")} variant="outline">
        Google
      </Button>
    </div>
  );
};
