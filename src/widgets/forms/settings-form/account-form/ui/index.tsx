"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { HOME_ROUTE } from "@shared/consts";
import { displayError, isDefaultAvatar } from "@shared/lib";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Switch,
  buttonVariants,
  useToast,
} from "@shared/ui";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountSettingsFormSchema, accountSettingsFormSchema } from "../model";
import { AccountFormAvatar } from "./account-form-avatar";
import { AlertModal } from "@shared/ui/modal";

export const AccountForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoaded } = useUser();
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<AccountSettingsFormSchema>({
    defaultValues: {
      image: null,
      isPrivateLibrary: false,
      username: "",
    },
    resolver: zodResolver(accountSettingsFormSchema),
  });

  useEffect(() => {
    if (isLoaded && user) {
      form.setValue("isPrivateLibrary", user.unsafeMetadata.isPrivateLibrary);
      form.setValue("username", user.username || "");
      setImagePreview(user.profileImageUrl);
    }
  }, [isLoaded, user, form]);

  const onDeleteImage = async () => {
    if (!isLoaded || !user) return;
    setIsLoading(true);

    try {
      if (isDefaultAvatar(user.profileImageUrl)) {
        setImagePreview(user.profileImageUrl);
        form.setValue("image", null);
      } else {
        await user.setProfileImage({ file: null });
        setImagePreview("");
        toast({
          title: "Profile image deleted",
          variant: "success",
        });
      }
    } catch (error) {
      displayError(toast, error, "Profile image could not be deleted");
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteUser = async () => {
    if (!isLoaded || !user) return;

    setIsLoading(true);
    form.setValue("image", null);

    try {
      await user.delete();
      toast({
        title: "Account deleted successfully",
        variant: "success",
      });
      router.push(HOME_ROUTE);
    } catch (error) {
      displayError(toast, error, "Account could not be deleted");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<AccountSettingsFormSchema> = async (data) => {
    if (!isLoaded || !user) return;

    setIsLoading(true);
    try {
      const { image, isPrivateLibrary, username } = data;

      if (image) {
        await Promise.all([
          user.setProfileImage({ file: (image as FileList)[0] }),
          user.update({ username, unsafeMetadata: { isPrivateLibrary } }),
        ]);
      } else {
        await user.update({ username, unsafeMetadata: { isPrivateLibrary } });
      }

      toast({
        title: "Account settings saved successfully",
        variant: "success",
      });
    } catch (err) {
      displayError(toast, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={onDeleteUser}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-left h-full flex flex-col pb-4 md:pb-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 mb-4 md:mb-6">
            <div className="flex flex-col gap-2">
              <AccountFormAvatar
                imagePreview={imagePreview}
                imageRef={imageRef}
                isLoaded={isLoaded}
                onDeleteImage={onDeleteImage}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ref, ...field } }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <>
                        <input
                          id="profileImage"
                          className="sr-only"
                          type="file"
                          value={value?.fileName}
                          ref={(e) => {
                            ref(e);
                            imageRef.current = e;
                          }}
                          onChange={(e) => {
                            onChange(e.target.files);

                            if (e.target.files)
                              setImagePreview(
                                URL.createObjectURL(e.target.files[0])
                              );
                          }}
                          {...field}
                        />
                        <label
                          className={buttonVariants({
                            variant: "secondary",
                            className: "cursor-pointer mb-2",
                          })}
                          htmlFor="profileImage"
                        >
                          Change Avatar
                        </label>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 max-w-xs flex-auto">
              <div className="space-y-2">
                <Label className="text-base">Email</Label>
                <p className="text-muted-foreground font-semibold">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPrivateLibrary"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel>Make Library Private</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="max-w-xs flex-1 pb-6">
            <Button
              disabled={!isLoaded || isLoading || !form.formState.isDirty}
              className="font-bold w-full"
              type="submit"
            >
              Save Settings
            </Button>
          </div>
          <Button
            className="max-w-xs mt-8"
            disabled={!isLoaded || isLoading}
            type="button"
            variant="destructive"
            onClick={() => setAlertModalOpen(true)}
          >
            Delete my Account
          </Button>
        </form>
      </Form>
    </>
  );
};
