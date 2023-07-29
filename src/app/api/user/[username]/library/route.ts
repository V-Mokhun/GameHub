import { currentUser } from "@clerk/nextjs";
import { MIN_USER_RATING, getFilteredLibrarySchema } from "@shared/api";
import { catchError } from "@shared/lib";
import { db } from "@shared/lib/db";
import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { username: string } }
// ) {
//   try {
//     const user = await currentUser();
//     const { username } = params;

//     const dbUser = await db.user.findUnique({
//       where: {
//         username,
//       },
//       include: {
//         library: true,
//       },
//     });

//     if (!dbUser) return new NextResponse("User not found", { status: 404 });

//     if (user?.username !== username && dbUser.isPrivateLibrary)
//       return new NextResponse(`${params.username}'s library is private`, {
//         status: 403,
//       });

//     return NextResponse.json(dbUser.library, { status: 200 });
//   } catch (error) {
//     return catchError(error, `Failed to get ${params.username}'s library`);
//   }
// }

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
        isOwnProfile: authUser?.username === params.username,
      });

    const body = await req.json();
    const { filters, paginate, sort, noLimit } =
      getFilteredLibrarySchema.parse(body);

    let whereClause: any = {};
    let andClause: any[] = [];
    if (filters.categories.length > 0) {
      const orClause: any[] = [];
      filters.categories.forEach((categoryId) =>
        orClause.push({ category: categoryId })
      );
      andClause.push({ OR: orClause });
    }
    if (filters.genres.length > 0) {
      const orClause: any[] = [];
      filters.genres.forEach((genreId) =>
        orClause.push({ genres: { contains: String(genreId) } })
      );
      andClause.push({ OR: orClause });
    }
    if (filters.themes.length > 0) {
      const orClause: any[] = [];
      filters.themes.forEach((themeId) =>
        orClause.push({ themes: { contains: String(themeId) } })
      );
      andClause.push({ OR: orClause });
    }
    if (filters.gameModes.length > 0) {
      const orClause: any[] = [];
      filters.gameModes.forEach((gameModeId) =>
        orClause.push({ gameModes: { contains: String(gameModeId) } })
      );
      andClause.push({ OR: orClause });
    }
    if (filters.userRatingMin >= MIN_USER_RATING) {
      whereClause.userRating = {
        gte: filters.userRatingMin,
        lte: filters.userRatingMax,
      };
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
          take: noLimit ? undefined : paginate.limit,
          skip: paginate.offset,
          where: {
            AND: andClause,
            totalRating: { gte: filters.ratingMin, lte: filters.ratingMax },
            ...whereClause,
          },
        },
        _count: {
          select: {
            library: {
              where: {
                totalRating: { gte: filters.ratingMin, lte: filters.ratingMax },
                ...whereClause,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        library: dbUser!.library,
        count: dbUser!._count.library,
        isPrivateLibrary: false,
        isOwnProfile: authUser?.username === params.username,
      },
      { status: 200 }
    );
  } catch (error) {
    return catchError(error, `Failed to get ${params.username}'s library`);
  }
}
