import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The paths we need to redirect from the root to the (app) group
const APP_PATHS = [
  '/research',
  '/tracked-channels',
  '/saved-videos',
  '/learn',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is an app path that needs redirecting
  const isAppPath = APP_PATHS.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  if (isAppPath) {
    // If there's an existing request URL, we redirect to the correct path
    return NextResponse.redirect(
      new URL(pathname, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/research/:path*',
    '/tracked-channels/:path*',
    '/saved-videos/:path*',
    '/learn/:path*',
  ],
}; 