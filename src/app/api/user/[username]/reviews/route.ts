import { DEFAULT_LIMIT, ReviewSortFields, SortFieldsOrder } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
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
          limit: z.number().default(DEFAULT_LIMIT),
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
          hasSpoiler: hideSpoilers ? false : undefined,
          user: {
            username,
          },
        },
        orderBy: orderClause,
        take: limit,
        skip: offset,
        include: {
          game: {
            select: {
              id: true,
              coverUrl: true,
              releaseDate: true,
              name: true,
            },
          },
          votes: true,
        },
      }),
      db.gameReview.count({
        where: {
          hasSpoiler: hideSpoilers ? false : undefined,
          user: {
            username,
          },
        },
      }),
    ]);

    return NextResponse.json({ reviews: gameReviews, count }, { status: 200 });
  } catch (error) {
    return catchError(error, `Error getting ${params.username}'s reviews`);
  }
}
