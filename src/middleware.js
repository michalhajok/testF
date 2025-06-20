import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define routes that require authentication
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

// Define routes that require specific roles
const roleProtectedRoutes = {
  "/admin": ["admin"],
  "/employees/add": ["admin"],
  "/reports/financial": ["admin"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if the route requires specific roles
  const requiredRoles = Object.entries(roleProtectedRoutes)
    .filter(([route]) => pathname === route || pathname.startsWith(`${route}/`))
    .map(([_, roles]) => roles)
    .flat();

  // If it's not a protected route, allow access
  if (!isProtectedRoute && requiredRoles.length === 0) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If there's no token and it's a protected route, redirect to login
  if (!token && isProtectedRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If there are required roles, check if the user has the necessary role
  if (requiredRoles.length > 0 && !requiredRoles.includes(token?.user?.role)) {
    // User doesn't have the required role, redirect to unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // For auth pages, redirect to dashboard if user is already logged in
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname === "/"
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
