"use client";

import { useEffect, useState } from "react";
import { SignUpFormRegister } from "./sign-up-form-register";
import { SignUpFormVerify } from "./sign-up-form-verify";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@shared/consts";

interface SignUpFormProps {}

export const SignUpForm = ({}: SignUpFormProps) => {
  const [isPendingVerification, setIsPendingVerification] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) router.push(HOME_ROUTE);
  }, [userId, router]);

  return userId ? null : (
    <>
      {isPendingVerification ? (
        <SignUpFormVerify onGoBack={() => setIsPendingVerification(false)} />
      ) : (
        <SignUpFormRegister
          onFormSubmit={() => setIsPendingVerification(true)}
        />
      )}
    </>
  );
};
