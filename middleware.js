import { NextResponse } from "next/server";
import { verifyToken, getCookieName } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/dashboard/")) return NextResponse.next();

  const dashboardId = pathname.split("/")[2];
  if (!dashboardId) return NextResponse.next();

  const token = request.cookies.get(getCookieName(dashboardId))?.value;
  if (!token) {
    return NextResponse.redirect(new URL(`/login/${dashboardId}`, request.url));
  }

  const payload = await verifyToken(token);
  if (!payload || payload.dashboardId !== dashboardId) {
    return NextResponse.redirect(new URL(`/login/${dashboardId}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
