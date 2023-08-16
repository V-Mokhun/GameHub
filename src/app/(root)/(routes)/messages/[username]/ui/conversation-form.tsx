"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormField,
  FormItem,
  Icon,
  Input,
  Textarea,
} from "@shared/ui";
import { CldUploadButton } from "next-cloudinary";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ConversationFormProps {
  conversationId?: string;
}

const messageFormSchema = z.object({
  body: z.string().optional(),
  conversationId: z.string().optional(),
});

type MessageFormSchema = z.infer<typeof messageFormSchema>;

export const ConversationForm = ({ conversationId }: ConversationFormProps) => {
  const form = useForm<MessageFormSchema>({
    defaultValues: {
      body: "",
    },
    resolver: zodResolver(messageFormSchema),
  });

  const onSubmit: SubmitHandler<MessageFormSchema> = async (data) => {
    console.log(data);
  };

  const handleUpload = (result: any) => {
    //      image: result?.info?.secure_url,
    console.log(result);
  };

  const handleUserKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      form.handleSubmit(onSubmit)();
      form.setValue("body", "");
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
              name="body"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Textarea
                    onKeyDown={handleUserKeyPress}
                    className="min-h-0 h-10 resize-none"
                    placeholder="Aa"
                    {...field}
                  />
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
