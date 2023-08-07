"use client";

import {
  LIBRARY_ROUTE,
  SETTINGS_ROUTE,
  SIGN_IN_ROUTE,
  TOAST_TIMEOUT,
} from "@shared/consts";
import { buttonVariants, useToast } from "@shared/ui";
import Link from "next/link";

export const useCustomToasts = () => {
  const { toast } = useToast();

  const gameSavedToast = (username: string) => {
    const { dismiss } = toast({
      title: "Game was saved to your library",
      variant: "success",
      action: (
        <Link
          onClick={() => dismiss()}
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "w-max self-end text-sm hover:text-white",
          })}
          href={LIBRARY_ROUTE(username)}
        >
          View library
        </Link>
      ),
    });
  };

  const usernameGeneratedToast = () => {
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
  };

  const signInLibraryToast = () => {
    const { dismiss } = toast({
      title: "Sign in to add games to your library",
      action: (
        <Link
          onClick={() => {
            setTimeout(() => {
              dismiss();
            }, TOAST_TIMEOUT);
          }}
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "w-max self-end text-sm hover:text-white",
          })}
          href={SIGN_IN_ROUTE}
        >
          Sign in
        </Link>
      ),
      variant: "destructive",
    });
  };

  return { gameSavedToast, usernameGeneratedToast, signInLibraryToast };
};
