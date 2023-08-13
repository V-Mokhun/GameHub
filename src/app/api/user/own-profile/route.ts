import { auth } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });
    const body = await req.json();
    const { includeFullRequests } = z
      .object({ includeFullRequests: z.boolean() })
      .parse(body);

    let include: any = {
      friends: true,
      sentFriendRequests: true,
      receivedFriendRequests: true,
    };

    if (includeFullRequests) {
      include = {
        friends: true,
        sentFriendRequests: {
          include: {
            receiver: {
              include: {
                friends: true,
              },
            },
          },
        },
        receivedFriendRequests: {
          include: {
            sender: {
              include: {
                friends: true,
              },
            },
          },
        },
      };
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include,
    });
    console.log(includeFullRequests, user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return catchError(error, "Failed to get own profile");
  }
}
