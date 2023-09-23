import { steam } from "@shared/config/steam";
import { catchError } from "@shared/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    const { steamid } = await steam.authenticate(req);
    const url = new URL("/import", req.url);
    url.searchParams.set("steamid", steamid);

    return NextResponse.redirect(url);
  } catch (error) {
    console.log(error);
    return catchError(error, "Could not authenticate with Steam.");
  }
}
