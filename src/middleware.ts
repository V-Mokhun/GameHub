import { authMiddleware } from "@clerk/nextjs";
import { PUBLIC_ROUTES } from "@shared/consts";

export default authMiddleware({
  publicRoutes: PUBLIC_ROUTES,
  ignoredRoutes: ["/api/webhooks/:path*", "/api/token"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
