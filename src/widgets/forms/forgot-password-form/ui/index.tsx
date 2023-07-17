"use client";

import { useState } from "react";
import { ForgotPasswordFormRegister } from "./forgot-password-form-register";
import { ForgotPasswordFormVerify } from "./forgot-password-form-verify";

interface ForgotPasswordFormProps {}

export const ForgotPasswordForm = ({}: ForgotPasswordFormProps) => {
  const [isPendingVerification, setIsPendingVerification] = useState(false);

  return (
    <>
      {isPendingVerification ? (
        <ForgotPasswordFormVerify
          onGoBack={() => setIsPendingVerification(false)}
        />
      ) : (
        <ForgotPasswordFormRegister
          onFormSubmit={() => setIsPendingVerification(true)}
        />
      )}
    </>
  );
};
