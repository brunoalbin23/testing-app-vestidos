import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/lib/jwt-secret";
const encoder = new TextEncoder();
const secretKey = encoder.encode(JWT_SECRET);

async function verifyAdminJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (e) {
    console.log("❌ ERROR VERIFICANDO TOKEN:", e);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("admin_token")?.value;

  const isLoginRoute =
    pathname === "/admin/login" ||
    pathname === "/admin/login/" ||
    pathname === "/api/admin/login";

  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;

  // /admin
  if (pathname === "/admin" || pathname === "/admin/") {
    const decoded = token ? await verifyAdminJWT(token) : null;

    if (!decoded) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  // Rutas protegidas
  if (isAdminRoute) {
    const decoded = token ? await verifyAdminJWT(token) : null;

    if (!decoded) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
