import { auth } from "@clerk/nextjs";
import { GAMES_LIMIT } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();
    const { search, limit, offset } = z
      .object({
        search: z.string().optional(),
        limit: z.number().default(GAMES_LIMIT),
        offset: z.number().default(0),
      })
      .parse(body);

    const users = await db.user.findMany({
      where: {
        id: { not: userId ?? undefined },
        username: { contains: search ?? "" },
      },
      take: limit,
      skip: offset,
      include: {
        friends: true,
      },
    });

    const usersWithFriendship = users.map((u) => {
      const { friends, ...user } = u;
      return {
        ...user,
        isFriend: friends.some((friend) => friend.id === userId),
      };
    });

    return NextResponse.json(usersWithFriendship, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get users");
  }
}
