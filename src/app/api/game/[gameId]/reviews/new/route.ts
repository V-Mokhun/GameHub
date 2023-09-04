import { auth } from "@clerk/nextjs";
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

    const body = await req.json();
    const {
      body: content,
      hasSpoiler,
      rating,
      title,
      userId,
    } = reviewFormSchema.extend({ userId: z.string() }).parse(body);

    if (!authUserId || authUserId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    db.gameReview.create({
      data: {
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
    return catchError(error, "Error creating review");
  }
}
