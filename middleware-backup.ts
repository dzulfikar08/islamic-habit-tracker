import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("next-auth.session-token")
  const isLoginPage = request.nextUrl.pathname === "/login"

  if (authToken === undefined && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isLoginPage && authToken !== undefined) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

