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
  Skeleton,
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
  gameId: string;
  reviewId?: string;
  userRating?: number;
  userId: string;
  game: Game;
  isEdit?: boolean;
  defaultValues?: ReviewFormSchema;
}

export const ReviewFormSkeleton = () => {
  return (
    <div className="space-y-4 flex-1">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-[200px] md:h-[320px] w-full" />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
          <div className="space-y-0 lg:space-y-2 flex items-center gap-2 lg:gap-0 lg:items-start lg:flex-col">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-6 w-11 my-auto rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-60" />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export const ReviewForm = ({
  gameId,
  reviewId,
  userId,
  userRating,
  game,
  isEdit,
  defaultValues,
}: ReviewFormProps) => {
  const router = useRouter();
  const form = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: defaultValues ?? {
      body: "",
      title: "",
      hasSpoiler: false,
      rating: userRating,
    },
  });
  const { mutate: createReview, isLoading: isCreating } =
    gamesApi.createReview(gameId);
  const { mutate: editReview, isLoading: isEditing } = gamesApi.editReview(
    gameId,
    reviewId
  );

  const isLoading = isCreating || isEditing;

  const onSubmit = async (data: ReviewFormSchema) => {
    if (isEdit) {
      if (!reviewId) return;

      await editReview({ ...data, userId });
    } else {
      await createReview({ review: { ...data, userId }, game });
    }
    router.push(REVIEWS_ROUTE(gameId));
  };

  return (
    <div className="space-y-4 flex-1">
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
            render={({ field }) => (
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
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
            <FormField
              control={form.control}
              name="hasSpoiler"
              render={({ field }) => (
                <FormItem className="space-y-0 lg:space-y-2 flex items-center gap-2 lg:gap-0 lg:items-start lg:flex-col">
                  <FormLabel>Does this review contain spoilers?</FormLabel>
                  <FormControl>
                    <Switch
                      className="my-auto"
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
              render={({ field }) => (
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
              {isEdit ? "Edit" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
