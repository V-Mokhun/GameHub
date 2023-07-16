import { authMiddleware } from "@clerk/nextjs";
import { PUBLIC_ROUTES } from "@shared/consts";

export default authMiddleware({
  publicRoutes: PUBLIC_ROUTES,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
