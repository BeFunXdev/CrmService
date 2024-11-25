import {NextRequest, NextResponse} from "next/server";
import {TokenNames} from '@/constants/AuthConstatnts';
import {PagesUrl} from "@/constants/pageUrl";

export function middleware(request: NextRequest) {
    const {url, cookies} = request
    console.log('test')

    const refreshToken = cookies.get(TokenNames.REFRESH_TOKEN)?.value

    const isAuthPage = url.includes('/auth')

    if (isAuthPage && refreshToken) {
        return NextResponse.redirect(new URL(PagesUrl.HOME, url))
    }

    if (isAuthPage) {
        return NextResponse.next()
    }

    if (!refreshToken) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/i/:path*', '/auth/:path*']
}