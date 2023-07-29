import { currentUser } from "@clerk/nextjs";
import { getFilteredLibrarySchema } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await currentUser();
    const { username } = params;

    const dbUser = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        library: true,
      },
    });

    if (!dbUser) return new NextResponse("User not found", { status: 404 });

    if (user?.username !== username && dbUser.isPrivateLibrary)
      return new NextResponse(`${params.username}'s library is private`, {
        status: 403,
      });

    return NextResponse.json(dbUser.library, { status: 200 });
  } catch (error) {
    return catchError(error, `Failed to get ${params.username}'s library`);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const authUser = await currentUser();
    const user = await db.user.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!user) return new NextResponse("User not found", { status: 404 });

    if (authUser?.username !== params.username && user.isPrivateLibrary)
      return NextResponse.json({
        library: [],
        count: 0,
        isPrivateLibrary: true,
      });

    const body = await req.json();
    const { filters, paginate, sort } = getFilteredLibrarySchema.parse(body);

    let whereClause: any = {};
    if (filters.categories.length > 0) {
      whereClause.category = { in: filters.categories };
    }
    if (filters.genres.length > 0) {
      whereClause.genres = { contains: filters.genres.join(",") };
    }
    if (filters.themes.length > 0) {
      whereClause.themes = { contains: filters.themes.join(",") };
    }
    if (filters.gameModes.length > 0) {
      whereClause.gameModes = { contains: filters.gameModes.join(",") };
    }
    if (filters.name) {
      whereClause.name = { contains: filters.name };
    }
    if (filters.status) {
      whereClause.status = filters.status;
    }

    const dbUser = await db.user.findUnique({
      where: { username: params.username },
      include: {
        library: {
          orderBy: {
            [sort.field]: sort.order,
          },
          take: paginate.limit,
          skip: paginate.offset,
          where: {
            totalRating: { gte: filters.ratingMin, lte: filters.ratingMax },
            userRating: {
              gte: filters.userRatingMin,
              lte: filters.userRatingMax,
            },
            ...whereClause,
          },
        },
        _count: {
          select: {
            library: {
              where: {
                totalRating: { gte: filters.ratingMin, lte: filters.ratingMax },
                userRating: {
                  gte: filters.userRatingMin,
                  lte: filters.userRatingMax,
                },
                ...whereClause,
              },
            },
          },
        },
      },
    });

    console.log("FILTERED LIBRARY: ", dbUser?.library);

    return NextResponse.json(
      {
        library: dbUser!.library,
        count: dbUser!._count.library,
        isPrivateLibrary: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return catchError(error, `Failed to get ${params.username}'s library`);
  }
}
