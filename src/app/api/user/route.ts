import { auth } from "@clerk/nextjs";
import { DEFAULT_LIMIT } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import omit from "lodash.omit";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();
    const { search, limit, offset } = z
      .object({
        search: z.string().optional(),
        limit: z.number().default(DEFAULT_LIMIT),
        offset: z.number().default(0),
      })
      .parse(body);

    let whereClause: any = {
      id: { not: userId ?? undefined },
    };

    if (search) {
      whereClause.username = { contains: search };
    }

    const [users, count] = await db.$transaction([
      db.user.findMany({
        where: whereClause,
        take: limit,
        skip: offset,
        include: {
          friends: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              createdAt: true,
              isPrivateLibrary: true,
            },
          },
        },
      }),
      db.user.count({ where: whereClause }),
    ]);

    const usersWithFriendship = users.map((user) => {
      return {
        ...omit(user, "email"),
        isFriend: user.friends.some((friend) => friend.id === userId),
      };
    });

    return NextResponse.json(
      { users: usersWithFriendship, count },
      { status: 200 }
    );
  } catch (error) {
    return catchError(error, "Failed to get users");
  }
}
