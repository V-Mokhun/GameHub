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
  Input,
  Textarea,
} from "@shared/ui";
import { CldUploadButton } from "next-cloudinary";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
  const { mutate: sendMessage } = userApi.sendMessage(
    username,
    conversationId
  );

  const form = useForm<MessageFormSchema>({
    defaultValues: {
      message: "",
      conversationId,
    },
    resolver: zodResolver(messageFormSchema),
  });

  const onSubmit: SubmitHandler<MessageFormSchema> = async (data) => {
    if (data.message.trim().length === 0) return;

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
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        >
          <Icon
            className="md:h-8 md:w-8 hover:text-secondary-hover transition-colors"
            name="Image"
          />
        </CldUploadButton>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormControl>
                    <Textarea
                      maxLength={1000}
                      onKeyDown={handleUserKeyPress}
                      className="min-h-0 h-10 resize-none"
                      placeholder="Aa"
                      {...field}
                    />
                  </FormControl>
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
      </div>
    </div>
  );
};
