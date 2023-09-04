import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;

    const gameReviews = await db.gameReview.findMany({
      where: {
        gameId: parseInt(gameId),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(gameReviews, { status: 200 });
  } catch (error) {
    return catchError(error, "Error getting reviews");
  }
}
