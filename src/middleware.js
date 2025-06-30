import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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

const roleProtectedRoutes = {
  "/admin": ["admin"],
  "/employees/add": ["admin"],
  "/reports/financial": ["admin"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const requiredRoles = Object.entries(roleProtectedRoutes)
    .filter(([route]) => pathname === route || pathname.startsWith(`${route}/`))
    .map(([_, roles]) => roles)
    .flat();

  // Jeśli nie jest to chroniona trasa i nie wymaga ról, pozwól przejść
  if (!isProtectedRoute && requiredRoles.length === 0) {
    return NextResponse.next();
  }

  // Pobierz token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Jeśli nie ma tokena, przekieruj do loginu
  if (!token && isProtectedRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // Jeśli są wymagane role, sprawdź uprawnienia
  if (requiredRoles.length > 0 && !requiredRoles.includes(token?.user?.role)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Jeśli user już zalogowany i wchodzi na login/register, przekieruj na dashboard
  if (
    ["/login", "/register", "/"].some(
      (r) => pathname === r || pathname.startsWith(r)
    )
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
