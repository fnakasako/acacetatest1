// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Example middleware logic
  // Ensure it does not cause unintended redirects
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
