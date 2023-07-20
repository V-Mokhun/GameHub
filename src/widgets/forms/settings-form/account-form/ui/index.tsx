"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountSettingsFormSchema, accountSettingsFormSchema } from "../model";

interface AccountFormProps {}

export const AccountForm = ({}: AccountFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoaded } = useUser();

  const form = useForm<AccountSettingsFormSchema>({
    defaultValues: user
      ? {
          imageUrl: user.profileImageUrl,
          isPrivateLibrary: user.publicMetadata.isPrivateLibrary,
          username: user.username || "",
        }
      : {
          imageUrl: "",
          isPrivateLibrary: false,
          username: "",
        },
    resolver: zodResolver(accountSettingsFormSchema),
  });

  const onSubmit: SubmitHandler<AccountSettingsFormSchema> = async (data) => {
    if (!isLoaded) return;

    try {
    } catch (err) {
      displayError(toast, err);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-left"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="Email or Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!isLoaded || form.formState.isSubmitting}
            className="w-full font-bold"
            type="submit"
          >
            Save Settings
          </Button>
        </form>
      </Form>
    </>
  );
};
