import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userId = req.cookies.get('userid');

  console.log(req.nextUrl.pathname);
  if (
    userId?.value &&
    (req.nextUrl.pathname === '/signup' || req.nextUrl.pathname === '/signin')
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signup', '/signin'],
};
