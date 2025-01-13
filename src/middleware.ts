import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar", "jr"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  // /((?!api|static|pages|.*\\..*|_next).*)
  matcher: [
    "/",
    // "/en",
    // "/homePage",
    // "/dashboard",
    // "/developerAdminPage",
    // "/section",
    // "/profile",
    // "/login",
    // "/signup",
    '/((?!api|static|pages|.*\\..*|_next).*)'
  ],
};