import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup" || path == "/";

  const token = request.cookies.get("accessToken");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/explore", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/explore"],
};
