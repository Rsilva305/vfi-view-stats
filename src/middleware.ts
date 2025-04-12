import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware can later be used for authentication checks
export function middleware(request: NextRequest) {
  // For now, just allow all requests to proceed for testing
  return NextResponse.next();
}

// Limited matcher to only handle potential auth routes in the future
export const config = {
  matcher: []
}; 