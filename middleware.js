import { NextResponse } from "next/server";
import { verifyToken, getCookieName } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteggi solo le rotte /dashboard/[id]
  if (!pathname.startsWith("/dashboard/")) return NextResponse.next();

  const dashboardId = pathname.split("/")[2];
  if (!dashboardId) return NextResponse.next();

  const cookieName = getCookieName(dashboardId);
  const token = request.cookies.get(cookieName)?.value;

  if (!token) {
    const loginUrl = new URL(`/login/${dashboardId}`, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyToken(token);
  if (!payload || payload.dashboardId !== dashboardId) {
    const loginUrl = new URL(`/login/${dashboardId}`, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
