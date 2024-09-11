// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userId = req.cookies.get('userId')?.value; // Get the userId from cookies

  if (!userId && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if not authenticated
  }

  return NextResponse.next();
}

// Only run middleware on specific routes
export const config = {
  matcher: ['/'],
};
