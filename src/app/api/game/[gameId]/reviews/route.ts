import { GAMES_LIMIT, ReviewSortFields, SortFieldsOrder } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;
    const body = await req.json();
    const {
      sort: { field, hideSpoilers, order },
      paginate: { limit, offset },
    } = z
      .object({
        sort: z.object({
          order: z.nativeEnum(SortFieldsOrder),
          field: z.nativeEnum(ReviewSortFields),
          hideSpoilers: z.boolean(),
        }),
        paginate: z.object({
          limit: z.number().default(GAMES_LIMIT),
          offset: z.number().default(0),
        }),
      })
      .parse(body);

    let orderClause: any = {
      votes: {
        _count: order,
      },
    };

    if (field === ReviewSortFields.RATING) {
      orderClause = {
        rating: order,
      };
    } else if (field === ReviewSortFields.CREATED_AT) {
      orderClause = {
        createdAt: order,
      };
    }

    const [gameReviews, count] = await db.$transaction([
      db.gameReview.findMany({
        where: {
          gameId: parseInt(gameId),
          hasSpoiler: hideSpoilers ? false : undefined,
        },
        orderBy: orderClause,
        take: limit,
        skip: offset,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
        },
      }),
      db.gameReview.count({
        where: {
          gameId: parseInt(gameId),
          hasSpoiler: hideSpoilers ? false : undefined,
        },
      }),
    ]);

    return NextResponse.json({ reviews: gameReviews, count }, { status: 200 });
  } catch (error) {
    return catchError(error, "Error getting reviews");
  }
}
