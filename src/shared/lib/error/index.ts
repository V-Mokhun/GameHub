import { useToast } from "@shared/ui";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const catchError = (
  error: unknown,
  genericErrorMessage = "Something went wrong",
  parseError = ""
) => {
  if (error instanceof ZodError) {
    return new NextResponse(parseError || error.message, { status: 422 });
  }

  return new NextResponse(genericErrorMessage, {
    status: 500,
  });
};

export const throwError = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response?.status === 422) {
      throw new ZodError(error.response?.data);
    } else if (error.response?.status === 404) {
      throw new Error("Not found");
    } else if (error.response?.status === 401) {
      throw new Error("Unauthorized");
    }

    throw error.response?.data || "Something went wrong...";
  }

  throw error;
};

export const displayError = (
  toast: ReturnType<typeof useToast>["toast"],
  error: unknown,
  genericErrorMessage = "Something went wrong...",
  parseError = ""
) => {
  if (isAxiosError(error)) {
    return toast({ title: error.response?.data || genericErrorMessage });
  } else if (error instanceof ZodError) {
    if (Array.isArray(error.issues) && error.issues.length > 0)
      return toast({ title: parseError || error.issues[0].message });

    return toast({ title: genericErrorMessage });
  } else if (error instanceof Error) {
    return toast({ title: error.message });
  } else if (typeof error === "string") {
    return toast({ title: error });
  }

  return toast({ title: genericErrorMessage });
};
