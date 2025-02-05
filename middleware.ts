import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decode } from "jsonwebtoken"
import { cookies } from "next/headers"


export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")
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

