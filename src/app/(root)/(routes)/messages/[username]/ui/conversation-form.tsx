"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FullMessage, userApi } from "@shared/api";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Skeleton,
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
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ConversationFormReplying } from "./conversation-form-replying";
import { cn } from "@shared/lib";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface ConversationFormProps {
  conversationId?: string;
  username: string;
  replyingMessage: FullMessage | null;
  resetReplyingMessage: () => void;
}

const messageFormSchema = z.object({
  message: z.string().max(1000, "Message must be max 1000 character long"),
  conversationId: z.string().optional(),
  replyingMessageId: z.string().optional(),
});

type MessageFormSchema = z.infer<typeof messageFormSchema>;

export const ConversationFormSkeleton = () => (
  <div className="px-2 py-2 md:py-4">
    <div className="flex items-center gap-2">
      <Skeleton className="w-6 h-6 md:w-8 md:h-8 rounded-md" />
      <Skeleton className="w-full h-10 rounded-3xl" />
      <Skeleton className="w-6 h-6 rounded-md" />
    </div>
  </div>
);

export const ConversationForm = ({
  conversationId,
  username,
  replyingMessage,
  resetReplyingMessage,
}: ConversationFormProps) => {
  const { resolvedTheme } = useTheme();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const { mutate: sendMessage } = userApi.sendMessage(username);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selection, setSelection] = useState<{ start: number; end: number }>();

  useEffect(() => {
    if (!selection || !textareaRef.current) return;
    const { start, end } = selection;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(start, end);
  }, [selection]);

  const form = useForm<MessageFormSchema>({
    defaultValues: {
      message: "",
      conversationId,
      replyingMessageId: replyingMessage?.id,
    },
    resolver: zodResolver(messageFormSchema),
  });

  const onSubmit: SubmitHandler<MessageFormSchema> = async (data) => {
    if (data.message.trim().length === 0) return;
    setIsEmojiOpen(false);
    form.setValue("message", "");
    if (textareaRef.current) textareaRef.current.style.height = "2.5rem";

    await sendMessage({
      conversationId,
      image: "",
      message: data.message,
      replyingMessage: replyingMessage,
    });
    resetReplyingMessage();
  };

  const handleUpload = async (result: any) => {
    await sendMessage({
      conversationId,
      image: result?.info?.secure_url,
      message: "",
      replyingMessage: replyingMessage,
    });
    resetReplyingMessage();
  };

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      form.handleSubmit(onSubmit)();
      form.setValue("message", "");
    }
  };

  return (
    <div
      className={cn(
        "px-2 py-2 md:pb-4 shadow-lg relative z-[2] bg-background",
        !replyingMessage && "md:pt-4"
      )}
    >
      {replyingMessage && (
        <ConversationFormReplying
          onClose={resetReplyingMessage}
          replyingMessage={replyingMessage}
        />
      )}
      <div className="flex items-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center shrink-0 mb-1">
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
                    className="h-8 w-8 hover:text-secondary-hover transition-colors"
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
            className="w-full flex items-end gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field: { onChange, ref, ...field } }) => (
                <FormItem className="w-full space-y-0 relative">
                  <FormControl>
                    <Textarea
                      maxLength={1000}
                      onKeyDown={handleUserKeyPress}
                      className="min-h-0 max-h-40 h-10 resize-none text-base rounded-3xl pr-10"
                      placeholder="Aa"
                      onChange={(e) => {
                        onChange(e);
                        if (!textareaRef.current) return;
                        textareaRef.current.style.height = "2.5rem";
                        const scrollHeight = textareaRef.current?.scrollHeight;
                        textareaRef.current.style.height = `${scrollHeight}px`;
                      }}
                      ref={(e) => {
                        ref(e);
                        textareaRef.current = e;
                      }}
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
              className="bg-transparent hover:bg-transparent mb-1"
              size="icon"
            >
              <Icon
                name="Send"
                size={24}
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
                if (!textareaRef.current) {
                  form.setValue(
                    "message",
                    form.getValues("message") + emoji.emoji
                  );
                  return;
                }
                const cursorPosition = textareaRef.current.selectionStart;
                const textBeforeCursorPosition =
                  textareaRef.current.value.substring(0, cursorPosition);
                const textAfterCursorPosition =
                  textareaRef.current.value.substring(
                    cursorPosition,
                    textareaRef.current.value.length
                  );
                form.setValue(
                  "message",
                  textBeforeCursorPosition +
                    emoji.emoji +
                    textAfterCursorPosition
                );
                setSelection({
                  start: cursorPosition + emoji.emoji.length,
                  end: cursorPosition + emoji.emoji.length,
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
