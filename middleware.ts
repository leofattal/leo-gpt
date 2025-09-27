import { createMiddlewareSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient(request, response)

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth') ||
                     request.nextUrl.pathname === '/login'
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/chat') ||
                          request.nextUrl.pathname.startsWith('/profile')

  // Redirect authenticated users away from auth pages
  if (session && isAuthRoute && !request.nextUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.redirect(new URL('/chat', request.url))
  }

  // Redirect unauthenticated users to login
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}