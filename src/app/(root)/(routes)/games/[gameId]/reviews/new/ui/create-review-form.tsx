"use client";

import { GameUserRating } from "@entities/game";
import { zodResolver } from "@hookform/resolvers/zod";
import { REVIEWS_ROUTE } from "@shared/consts";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  StarRating,
  Switch,
  Textarea,
  Title,
  buttonVariants,
} from "@shared/ui";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateReviewFormProps {
  gameId: string;
  userRating?: number;
  userId: string;
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be minimum 3 characters long")
    .max(100, "Title must be maximum 100 characters long"),
  body: z
    .string()
    .min(300, "Review must be minimum 300 characters long")
    .max(8000, "Review must be maximum 8000 characters long"),
  hasSpoiler: z.boolean().default(false),
  rating: z
    .number({ required_error: "Rating the game is required" })
    .min(1)
    .max(10),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateReviewForm = ({
  gameId,
  userId,
  userRating,
}: CreateReviewFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      title: "",
      hasSpoiler: false,
      rating: userRating,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
  };

  return (
    <div className="space-y-4 flex-1">
      <Title>New Review</Title>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Give your review a title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Give a detailed review of the game"
                    className="resize-none min-h-[200px] md:min-h-[320px]"
                    maxLength={8000}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center gap-2">
            <FormField
              control={form.control}
              name="hasSpoiler"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Does this review contain spoilers?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center gap-2">
                    <FormLabel>Your Rating</FormLabel>
                    {field.value && <GameUserRating userRating={field.value} />}
                  </div>
                  <FormControl>
                    <StarRating
                      disabled={false}
                      rating={field.value}
                      onSetRating={(val) => field.onChange(val)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-center gap-4 mt-4">
            <Link
              href={REVIEWS_ROUTE(gameId)}
              className={buttonVariants({ variant: "secondary" })}
            >
              Go Back
            </Link>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
