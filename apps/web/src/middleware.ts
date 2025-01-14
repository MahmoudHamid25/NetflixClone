import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthTokens } from '@/lib/auth-tokens';


export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard/auth') {
    return NextResponse.next();
  }
  try {
    const { accessToken, refreshToken } = await getAuthTokens();
    // console.log('middleware tokens', { accessToken, refreshToken });

    if (!refreshToken || !accessToken) {
      return NextResponse.redirect(new URL('/dashboard/auth', request.url));
    }


  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/dashboard/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};