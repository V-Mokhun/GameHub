import { auth } from "@clerk/nextjs";
import { Game, GameStatus, VoteType } from "@prisma/client";
import { CreateOrEditReview } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { reviewFormSchema } from "@widgets/forms";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;
    const { userId: authUserId } = auth();

    const body: { review: CreateOrEditReview; game: Game } = await req.json();
    const { review, game } = body;
    const {
      body: content,
      hasSpoiler,
      rating,
      title,
      userId,
    } = reviewFormSchema.extend({ userId: z.string() }).parse(review);

    if (!authUserId || authUserId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const libraryGame = await db.game.findUnique({
      where: {
        userId_id: {
          id: Number(gameId),
          userId: userId,
        },
      },
    });

    if (!libraryGame) {
      await db.game.create({
        data: {
          ...game,
          userRating: rating,
          status: GameStatus.COMPLETED,
        },
      });
    } else if (libraryGame.status !== GameStatus.COMPLETED) {
      await db.game.update({
        where: {
          userId_id: {
            id: Number(gameId),
            userId: userId,
          },
        },
        data: {
          userRating: rating,
          status: GameStatus.COMPLETED,
        },
      });
    }

    await db.$transaction(async (tx) => {
      const review = await tx.gameReview.create({
        data: {
          gameId: Number(gameId),
          body: content,
          rating,
          title,
          userId,
          hasSpoiler,
        },
      });

      await tx.gameReviewVote.create({
        data: {
          gameReviewId: review.id,
          userId,
          type: VoteType.UP,
        },
      });
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Error creating review");
  }
}
