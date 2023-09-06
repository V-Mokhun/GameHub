import { auth } from "@clerk/nextjs";
import { Game, GameStatus } from "@prisma/client";
import { CreateOrUpdateReview } from "@shared/api";
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

    const body: { review: CreateOrUpdateReview; game: Game } = await req.json();
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

    await db.gameReview.create({
      data: {
        id: undefined,
        gameId: Number(gameId),
        body: content,
        rating,
        title,
        userId,
        hasSpoiler,
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.log(error);

    return catchError(error, "Error creating review");
  }
}
