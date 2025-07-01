// src/middleware.js
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/patients",
  "/visits",
  "/appointments",
  "/examinations",
  "/employees",
  "/schedules",
  "/reports",
  "/profile",
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Pozwól na wszystkie API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Sprawdź czy to chroniona trasa
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Sprawdź token w cookie
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
