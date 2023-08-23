import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { PUBLIC_ROUTES, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@shared/consts";

export default authMiddleware({
  publicRoutes: PUBLIC_ROUTES,
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute && !auth.isApiRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
