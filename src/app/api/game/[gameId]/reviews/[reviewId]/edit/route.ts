import { auth } from "@clerk/nextjs";
import { Game } from "@prisma/client";
import { CreateOrEditReview } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { reviewFormSchema } from "@widgets/forms";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { gameId: string; reviewId: string } }
) {
  try {
    const { gameId, reviewId } = params;
    const { userId: authUserId } = auth();

    const body: CreateOrEditReview = await req.json();
    const { userId, ...reviewData } = reviewFormSchema
      .extend({ userId: z.string() })
      .parse(body);

    if (!authUserId || authUserId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const review = await db.gameReview.findUnique({
      where: { id: Number(reviewId), userId, gameId: Number(gameId) },
      include: {
        game: {
          select: {
            userRating: true,
          },
        },
      },
    });

    if (!review) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (reviewData.rating !== review.game.userRating) {
      await db.$transaction([
        db.game.update({
          where: {
            userId_id: {
              userId,
              id: Number(gameId),
            },
          },
          data: {
            userRating: reviewData.rating,
          },
        }),
        db.gameReview.update({
          where: { id: Number(reviewId), userId, gameId: Number(gameId) },
          data: reviewData,
        }),
      ]);
    } else {
      await db.gameReview.update({
        where: { id: Number(reviewId), userId, gameId: Number(gameId) },
        data: reviewData,
      });
    }

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to edit review");
  }
}
