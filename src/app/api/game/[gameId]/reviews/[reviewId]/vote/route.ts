import { auth } from "@clerk/nextjs";
import { VoteType } from "@prisma/client";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string; reviewId: string } }
) {
  try {
    const { reviewId } = params;
    const { userId: authUserId } = auth();
    const body = await req.json();
    const { voteType, userId } = z
      .object({
        voteType: z.nativeEnum(VoteType),
        userId: z.string(),
      })
      .parse(body);

    if (userId !== authUserId)
      return new NextResponse("Unauthorized", { status: 401 });

    const existingVote = await db.gameReviewVote.findUnique({
      where: {
        userId_gameReviewId: {
          gameReviewId: Number(reviewId),
          userId: authUserId,
        },
      },
    });

    if (!existingVote) {
      await db.gameReviewVote.create({
        data: {
          gameReviewId: Number(reviewId),
          userId: authUserId,
          type: voteType,
        },
      });
    } else if (existingVote.type === voteType) {
      await db.gameReviewVote.delete({
        where: {
          userId_gameReviewId: {
            gameReviewId: Number(reviewId),
            userId: authUserId,
          },
        },
      });
    } else {
      await db.gameReviewVote.update({
        where: {
          userId_gameReviewId: {
            gameReviewId: Number(reviewId),
            userId: authUserId,
          },
        },
        data: {
          type: voteType,
        },
      });
    }

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return catchError(error, "Could not vote review");
  }
}
