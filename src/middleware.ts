import { authMiddleware } from "@clerk/nextjs";
import { FORGOT_PASSWORD_ROUTE, PUBLIC_ROUTES } from "@shared/consts";

export default authMiddleware({
  publicRoutes: PUBLIC_ROUTES,
  ignoredRoutes: [FORGOT_PASSWORD_ROUTE]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
