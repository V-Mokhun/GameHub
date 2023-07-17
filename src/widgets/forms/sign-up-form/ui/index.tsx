"use client";

import { useState } from "react";
import { SignUpFormRegister } from "./sign-up-form-register";
import { SignUpFormVerify } from "./sign-up-form-verify";

interface SignUpFormProps {}

export const SignUpForm = ({}: SignUpFormProps) => {
  const [isPendingVerification, setIsPendingVerification] = useState(false);

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
