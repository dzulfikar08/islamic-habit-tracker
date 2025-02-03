import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {decode} from "jsonwebtoken"
import { cookies } from "next/headers"


export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true"
  const isLoginPage = request.nextUrl.pathname === "/login"
  const authToken = request.cookies.get("authToken")
  const authTokenExpired =
    authToken && typeof decode(authToken.value) === "object"
      ? (decode(authToken.value) as { exp: number }).exp < Date.now() / 1000
      : false

  // const deleteCookie = (name: string) => {
  //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  // }

  if (!isLoggedIn && !isLoginPage) {
    console.log("redirect to login because not logged in and not in loginpage")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isLoggedIn && isLoginPage && !authTokenExpired) {
    console.log("redirect to /")
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (authTokenExpired && !isLoginPage && isLoggedIn) {
    request.cookies.delete("authToken")
    request.cookies.delete("isLoggedIn")
    // cookies().delete("authToken")
    // cookies().delete("isLoggedIn")
    // deleteCookie("isLoggedIn")
    // deleteCookie("authToken")
    console.log("token expired, redirect to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


