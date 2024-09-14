import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { routing } from './i18n/routing';

const i18nMiddleware = createMiddleware(routing, {
  localeDetection: false,
});

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const userId = req.cookies.get('userid');

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  const authPathsRegex = /^\/(en|ru)\/(signup|signin)\/$/;
  const restGraphqlRegex = /^\/(en|ru)\/(rest|graphql|history)(\/.*)?$/;

  if (userId?.value && authPathsRegex.test(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (!userId?.value && restGraphqlRegex.test(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const response = i18nMiddleware(req);
  return response || NextResponse.next();
}

export const config = {
  matcher: ['/ru/:path*', '/en/:path*', '/', '/((?!_next|_vercel|./..).*)'],
};
