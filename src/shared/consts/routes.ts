export const HOME_ROUTE = "/";
export const BROWSE_ROUTE = "/browse";
export const LIBRARY_ROUTE = "/library";

export const SIGN_IN_ROUTE = "/sign-in";
export const SIGN_OUT_ROUTE = "/sign-out";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";

export const GAMES_ROUTE = "/games";

export const PROFILE_ROUTE = "/profile";
export const SETTINGS_ROUTE = "/settings";

export const USERS_ROUTE = "/users";

export const PUBLIC_ROUTES = [
  HOME_ROUTE,
  BROWSE_ROUTE,
  `${GAMES_ROUTE}/:path*`,
  `${USERS_ROUTE}/:path*`,
];
