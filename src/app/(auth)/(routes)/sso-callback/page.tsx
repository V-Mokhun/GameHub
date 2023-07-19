"use client";

import { auth, useAuth, useClerk } from "@clerk/nextjs";
import { HOME_ROUTE, SIGN_UP_ROUTE } from "@shared/consts";
import { Title } from "@shared/ui";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SSOCallback() {
  const { userId } = useAuth();
  if (userId) redirect(HOME_ROUTE);

  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    handleRedirectCallback({
      redirectUrl: HOME_ROUTE,
    });
  }, [handleRedirectCallback]);

  return <Title>Redirecting...</Title>;
}
