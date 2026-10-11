import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(
    'x-bimu-locale',
    /^\/en(?:\/|$)/.test(request.nextUrl.pathname) ? 'en' : 'zh',
  );
  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: ['/((?!_next|images|media|favicon|bimu-2026.pdf).*)'],
};
