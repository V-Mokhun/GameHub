import { currentUser } from "@clerk/nextjs";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";
import omit from "lodash.omit";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const authUser = await currentUser();

    const user = await db.user.findUnique({
      where: {
        username: params.username,
      },
      include: {
        _count: true,
        friends: {
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
        },
      },
    });

    if (!user) return new NextResponse("User not found", { status: 404 });

    const isOwnProfile = authUser?.username === params.username;
    const includeLibrary = isOwnProfile || !user.isPrivateLibrary;

    return NextResponse.json(
      {
        user: omit(user, "email"),
        isOwnProfile,
        libraryIncluded: includeLibrary,
      },
      { status: 200 }
    );
  } catch (error) {
    return catchError(error, "Failed to get user");
  }
}
