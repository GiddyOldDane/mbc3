import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
  
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    // FIRST allow ApiAuth routes
    if (isApiAuthRoute) {
        return null;
    };

    // SECOND check other routes
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        };
        return null;
    };

    // FINALLY redirect to login if not authorized
    if(!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    };

    // accept route
    return null;
});

export const config = {
    //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], -original
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // from https://clerk.com/docs/references/nextjs/auth-middleware
};