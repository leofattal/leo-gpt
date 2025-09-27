import { createMiddlewareSupabaseClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log('🚀 Middleware executing for:', request.nextUrl.pathname);

  const response = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient(request, response);

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname === "/login";
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/chat") ||
    request.nextUrl.pathname.startsWith("/profile");

  console.log('Session exists:', !!session, 'Is protected route:', isProtectedRoute);

  // Redirect authenticated users away from auth pages
  if (session && isAuthRoute && !request.nextUrl.pathname.startsWith("/auth/callback")) {
    console.log('🔄 Redirecting authenticated user to chat');
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Redirect unauthenticated users to login
  if (!session && isProtectedRoute) {
    console.log('🔒 Redirecting unauthenticated user to login');
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/chat/:path*",
    "/profile/:path*"
  ],
};
