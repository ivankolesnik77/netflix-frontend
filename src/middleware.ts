import { NextResponse, NextRequest } from 'next/server'

export const protectedRoutes = ['/', '/profile']
export const authRoutes = ['/login']

export function middleware(request: NextRequest) {
    const isAuthenticated = !!request.cookies.get('refreshToken')?.value
    console.log('isAuthenticated', isAuthenticated)
    // if (
    //     !isAuthenticated &&
    //     protectedRoutes.includes(request.nextUrl.pathname)
    // ) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    // if (authRoutes.includes(request.nextUrl.pathname) && isAuthenticated) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|github).*)',
    ],
}
