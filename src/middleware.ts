import { NextResponse, NextRequest } from 'next/server'
import { ACCESS_TOKEN_KEY } from './utils/constants'

export const protectedRoutes = ['/', '/profile', '/account']
export const authRoutes = ['/login']

export function middleware(req: NextRequest) {
    let loggedin = req.cookies.get(ACCESS_TOKEN_KEY)
    const { pathname } = req.nextUrl

    if (loggedin && pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!loggedin && protectedRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

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
