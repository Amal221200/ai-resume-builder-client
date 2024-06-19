import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const routeMatcher = createRouteMatcher([
    "/dashboard(.*)",
])

export default clerkMiddleware((auth, req) => {
    if (routeMatcher(req)) auth().protect();
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};