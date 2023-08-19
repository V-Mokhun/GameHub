"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { userApi } from "@shared/api";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui";
import { Theme } from "emoji-picker-react";
import { CldUploadButton } from "next-cloudinary";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface ConversationFormProps {
  conversationId?: string;
  username: string;
}

const messageFormSchema = z.object({
  message: z.string().max(1000, "Message must be max 1000 character long"),
  conversationId: z.string().optional(),
});

type MessageFormSchema = z.infer<typeof messageFormSchema>;

export const ConversationForm = ({
  conversationId,
  username,
}: ConversationFormProps) => {
  const { resolvedTheme } = useTheme();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const { mutate: sendMessage } = userApi.sendMessage(username, conversationId);

  const form = useForm<MessageFormSchema>({
    defaultValues: {
      message: "",
      conversationId,
    },
    resolver: zodResolver(messageFormSchema),
  });

  const onSubmit: SubmitHandler<MessageFormSchema> = async (data) => {
    if (data.message.trim().length === 0) return;
    setIsEmojiOpen(false);
    form.setValue("message", "");

    await sendMessage({
      conversationId,
      image: "",
      message: data.message,
    });
  };

  const handleUpload = async (result: any) => {
    await sendMessage({
      conversationId,
      image: result?.info?.secure_url,
      message: "",
    });
  };

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      form.handleSubmit(onSubmit)();
      form.setValue("message", "");
    }
  };

  return (
    <div className="px-2 py-2 md:py-4 shadow-lg">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <CldUploadButton
                  options={{
                    maxFiles: 1,
                    clientAllowedFormats: [
                      "jpeg",
                      "jpg",
                      "png",
                      "webp",
                      "avif",
                    ],
                  }}
                  onUpload={handleUpload}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                >
                  <Icon
                    className="md:h-8 md:w-8 hover:text-secondary-hover transition-colors"
                    name="Image"
                  />
                </CldUploadButton>
              </div>
            </TooltipTrigger>
            <TooltipContent>Attach an Image</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full space-y-0 relative">
                  <FormControl>
                    <Textarea
                      maxLength={1000}
                      onKeyDown={handleUserKeyPress}
                      className="min-h-0 h-10 resize-none text-base rounded-3xl pr-10"
                      placeholder="Aa"
                      onFocus={() => setIsEmojiOpen(false)}
                      {...field}
                    />
                  </FormControl>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        className={"absolute right-1 bottom-2 md:bottom-1"}
                        onClick={() => setIsEmojiOpen((prev) => !prev)}
                        type="button"
                      >
                        <Icon
                          className="fill-secondary hover:fill-secondary-hover transition-colors text-white dark:text-muted w-6 h-6 md:w-8 md:h-8"
                          name={"Smile"}
                        />
                      </TooltipTrigger>
                      <TooltipContent>Choose an emoji</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <FormMessage className="absolute b-0" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-transparent hover:bg-transparent"
              size="icon"
            >
              <Icon
                name="Send"
                className="hover:text-secondary-hover transition-colors"
              />
            </Button>
          </form>
        </Form>
        {isEmojiOpen && (
          <div className="absolute right-10 bottom-16">
            <Picker
              theme={resolvedTheme === "light" ? Theme.LIGHT : Theme.DARK}
              previewConfig={{
                showPreview: false,
              }}
              onEmojiClick={(emoji) => {
                form.setValue(
                  "message",
                  form.getValues("message") + emoji.emoji
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
