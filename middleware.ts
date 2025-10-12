import { NextRequest, NextResponse } from 'next/server';
import { verifyJWTToken } from './lib/session';

// Defines the routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/signin', '/signup', '/'];

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const notDashboard = !request.nextUrl.pathname.startsWith('/dashboard');
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Get cookie
    const token = request.cookies.get('fur_legged_user_token')?.value;

    // Checks if the request is for protected routes

    if ((isProtectedRoute && !token) || !token) {
        return NextResponse.redirect(new URL('/user/signin', request.url));
    }

    try {
        // Verify token
        const isTokenValid = await verifyJWTToken(token);

        if (!isTokenValid) {
            return NextResponse.redirect(new URL('/user/signin', request.url));
        }

        // Checks the role is admin
        if (isPublicRoute && isTokenValid.role === 'admin' && notDashboard) {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        }

        // Checks the role is user
        if (isPublicRoute && isTokenValid.role === 'user' && notDashboard) {
            return NextResponse.redirect(new URL('/dashboard/user', request.url));
        }
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL('/user/signin', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/user/:path*', '/dashboard/admin/:path*', '/api/:path*'],
};
