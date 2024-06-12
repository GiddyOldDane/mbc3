import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const pathname = req.nextUrl.pathname;
    console.log("ROUTE: ", pathname)
    console.log("LOGGED IN: ", isLoggedIn)
    // req.auth
});

export const config = {
    //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], -original
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // from https://clerk.com/docs/references/nextjs/auth-middleware
}