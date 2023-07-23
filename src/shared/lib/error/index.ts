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
    if (Array.isArray(error.response?.data) && error.response?.data[0]?.title)
      return toast({
        title: error.response?.data[0].title,
        variant: "destructive",
      });

    return toast({
      title: error.response?.data || genericErrorMessage,
      variant: "destructive",
    });
  } else if (error instanceof ZodError) {
    if (Array.isArray(error.issues) && error.issues.length > 0)
      return toast({
        title: parseError || error.issues[0].message,
        variant: "destructive",
      });
    return toast({ title: genericErrorMessage, variant: "destructive" });
  } else if (
    // @ts-ignore
    error?.errors &&
    // @ts-ignore
    Array.isArray(error.errors) &&
    // @ts-ignore
    error.errors.length > 0
  ) {
    // @ts-ignore
    return toast({ title: error.errors[0].message, variant: "destructive" });
  } else if (error instanceof Error) {
    return toast({ title: error.message, variant: "destructive" });
  } else if (typeof error === "string") {
    return toast({ title: error, variant: "destructive" });
  }

  return toast({ title: genericErrorMessage });
};
