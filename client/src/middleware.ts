import { NextRequest, NextResponse } from "next/server";
const pathAuthentication = ['/login', '/register']
export const middleware = (request: NextRequest) => {
    const clientId = request.cookies.get('client_id')
    const { pathname } = request.nextUrl
    if (pathAuthentication.includes(pathname)) {
        return NextResponse.next()
    }
    if (!clientId) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    return NextResponse.next();


}




export const config = {
    matcher: ["/", '/login', '/register'], // tránh apply middleware lên static file
}