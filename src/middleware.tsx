import { NextRequest, NextResponse } from 'next/server';

import { verifyJwtToken } from './admin/auth';

// const AUTH_PAGES = ["/admin"];
// const isAuthPages = (url:string) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const token = cookies.get('token')?.value ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = nextUrl.pathname.startsWith('/admin');

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const searchParams = new URLSearchParams(nextUrl.searchParams);
      searchParams.set('next', nextUrl.pathname);
      const response = NextResponse.redirect(
        new URL(`/login?${searchParams}`, url)
      );
      response.cookies.delete('token');
      return response;
      // const response = NextResponse.next();
      // response.cookies.delete("token");
    }
    // console.log("ok",url,new URL(`/`, url));
    // const response = NextResponse.redirect(new URL(url));
    // return response;
  }
  if (nextUrl.pathname.startsWith('/login') && hasVerifiedToken) {
    const response = NextResponse.redirect(new URL(`/admin`, url));
    return response;
  }

  return NextResponse.next();
}
export const config = { matcher: ['/login', '/admin/:path*'] };
