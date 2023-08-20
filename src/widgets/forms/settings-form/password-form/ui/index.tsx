"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SETTINGS_ROUTE } from "@shared/consts";
import { displayError } from "@shared/lib";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from "@shared/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PasswordSettingsFormSchema,
  passwordSettingsFormSchema,
} from "../model";
import { PasswordFormSkeleton } from "./skeleton";

export const PasswordForm = ({}) => {
  const { isLoaded, user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PasswordSettingsFormSchema>({
    defaultValues: { oldPassword: "", newPassword: "" },
    resolver: zodResolver(passwordSettingsFormSchema),
  });
  const router = useRouter();

  useEffect(() => {
    if (user && !user.passwordEnabled) {
      toast({
        title: "You don't have a password",
        description:
          "You can't change your password because you don't have one.",
        variant: "destructive",
      });
      router.push(SETTINGS_ROUTE);
    }
  }, [user, router, toast]);

  if (!isLoaded) return <PasswordFormSkeleton />;
  if (!user?.passwordEnabled) return null;

  const onSubmit: SubmitHandler<PasswordSettingsFormSchema> = async (data) => {
    if (data.oldPassword === data.newPassword) {
      return form.setError("newPassword", {
        type: "manual",
        message: "New password must be different from old password",
      });
    }

    if (!isLoaded || !user) return;

    setIsLoading(true);
    try {
      await user.updatePassword({
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully",
        variant: "success",
      });
      router.push(SETTINGS_ROUTE);
    } catch (error) {
      displayError(toast, error, "Unable to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mb-2 text-left max-w-sm"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Old Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!isLoaded || isLoading}
          className="w-full font-bold"
          type="submit"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};
