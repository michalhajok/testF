import { NextResponse } from "next/server";
import { verifyJWT } from "./src/lib/auth";

// Define protected routes based on user roles
const protectedRoutes = {
  admin: ["/admin"],
  physiotherapist: ["/physiotherapist"],
  receptionist: ["/receptionist"],
  patient: ["/patient"],
};

const publicRoutes = ["/login", "/"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT token
    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check role-based access
    const userRole = payload.role;
    const isAuthorizedForRoute = Object.entries(protectedRoutes).some(
      ([role, routes]) => {
        if (userRole === role) {
          return routes.some((route) => pathname.startsWith(route));
        }
        return false;
      }
    );

    if (!isAuthorizedForRoute) {
      // Redirect to appropriate dashboard based on role
      const redirectPath = `/${userRole}`;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    // Add user info to headers for downstream use
    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.id);
    response.headers.set("x-user-role", payload.role);
    response.headers.set("x-user-email", payload.email);

    return response;
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
