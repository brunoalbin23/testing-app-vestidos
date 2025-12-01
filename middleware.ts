import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWTToken } from '@/lib/jwt-auth';

const ADMIN_ROUTES = ['/admin', '/api/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas públicas de admin (login)
  const isLoginRoute = pathname === '/admin/login' || pathname === '/api/admin/login';
  
  // Rutas protegidas de admin
  const isProtectedAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route)) && !isLoginRoute;
  
  if (isProtectedAdminRoute) {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token || !verifyJWTToken(token)) {
      // Redirigir a login si intenta acceder a rutas protegidas sin token válido
      if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      // Para API, retornar 401
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};

