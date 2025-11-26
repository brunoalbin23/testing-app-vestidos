import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CSRF_COOKIE = 'gr_csrf';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Establecer cookie CSRF si no existe
  const csrfToken = request.cookies.get(CSRF_COOKIE);
  if (!csrfToken) {
    const newToken = crypto.randomUUID();
    response.cookies.set(CSRF_COOKIE, newToken, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};

