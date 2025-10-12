import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Check if request is for admin subdomain
  if (host.startsWith("admin.")) {
    // Redirect all admin requests to /admin routes
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = "/admin" + url.pathname;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
