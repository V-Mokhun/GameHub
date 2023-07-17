"use client";

import { useState } from "react";
import { SignUpFormRegister } from "./sign-up-form-register";
import { SignUpFormVerify } from "./sign-up-form-verify";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@shared/consts";

interface SignUpFormProps {}

export const SignUpForm = ({}: SignUpFormProps) => {
  const [isPendingVerification, setIsPendingVerification] = useState(true);
  const { userId } = useAuth();
  const router = useRouter();

  if (userId) router.push(HOME_ROUTE);

  return (
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
