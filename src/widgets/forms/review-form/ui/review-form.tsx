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
import { ReviewFormSchema, reviewFormSchema } from "../model";
import { gamesApi } from "@shared/api";
import { useRouter } from "next/navigation";
import { cn } from "@shared/lib";
import { Game } from "@prisma/client";

interface ReviewFormProps {
  title?: string;
  gameId: string;
  userRating?: number;
  userId: string;
  game: Game;
}

export const ReviewForm = ({
  gameId,
  userId,
  userRating,
  title = "New Review",
  game,
}: ReviewFormProps) => {
  const router = useRouter();
  const form = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      body: "",
      title: "",
      hasSpoiler: false,
      rating: userRating,
    },
  });
  const { mutate: createReview, isLoading } = gamesApi.createReview(gameId);

  const onSubmit = async (data: ReviewFormSchema) => {
    await createReview({ review: { ...data, userId }, game });
    router.push(REVIEWS_ROUTE(gameId));
  };

  return (
    <div className="space-y-4 flex-1">
      <Title>{title}</Title>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Give your review a title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
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
              render={({ field, formState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Does this review contain spoilers?</FormLabel>
                  <FormControl>
                    <Switch
                      disabled={isLoading}
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
              render={({ field, formState }) => (
                <FormItem>
                  <div className="flex justify-between items-center gap-2">
                    <FormLabel>Your Rating</FormLabel>
                    {field.value && <GameUserRating userRating={field.value} />}
                  </div>
                  <FormControl>
                    <StarRating
                      disabled={isLoading}
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
              className={buttonVariants({
                variant: "secondary",
                className: cn(isLoading && "pointer-events-none opacity-50"),
              })}
            >
              Go Back
            </Link>
            <Button disabled={isLoading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};