import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string; reviewId: string } }
) {
  try {
    const { gameId, reviewId } = params;
    const { userId: authUserId } = auth();
    const body = await req.json();
    const { userId } = z.object({ userId: z.string() }).parse(body);

    if (Number.isNaN(Number(reviewId)))
      return new NextResponse("Not found", { status: 404 });

    if (!authUserId || authUserId !== userId)
      return new NextResponse("Unauthorized", { status: 401 });

    const review = await db.gameReview.findUnique({
      where: { id: Number(reviewId), gameId: Number(gameId) },
      include: {
        game: true,
        user: true,
        votes: true,
      },
    });

    if (!review) return new NextResponse("Not found", { status: 404 });

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get review");
  }
}
