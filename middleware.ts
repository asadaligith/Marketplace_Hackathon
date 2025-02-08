import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/studio(.*)", "/((?!api|_next/static|_next/image|favicon.ico).*)"], 
};
