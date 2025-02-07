import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Middleware ka matcher jo har route pe apply hoga
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
