import { NextResponse, NextRequest } from 'next/server'
import { validToken } from '@/lib/jwt'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const userData = await validToken();

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/api/auth/login'];

  // Si la ruta es pública, permitir acceso sin autenticación
  if (publicRoutes.includes(pathname)) {
    const response = pathname === '/login' && userData
      ? NextResponse.redirect(new URL('/dashboard', req.url))
      : NextResponse.next();
    return response;
  }

  // Proteger rutas de API (excepto las públicas)
  if (pathname.startsWith('/api') && !userData) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    );
  }

  // Si intenta acceder a /dashboard o /crear-restaurante y NO está autenticado, redirige a login
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/crear-restaurante')) && !userData) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/crear-restaurante') && userData && userData.role === 'GESTOR' && userData.restaurantId !== -1) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirige a crear-restaurante solo si el usuario es GESTOR y el restaurantId es -1
  if (pathname.startsWith('/dashboard') && userData && userData.role === 'GESTOR' && userData.restaurantId === -1) {
    return NextResponse.redirect(new URL('/crear-restaurante', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/crear-restaurante',
    '/api/:path*'
  ],
}