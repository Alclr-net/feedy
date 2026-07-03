import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;
  const isAuthPage = (pathname.startsWith("/signIn") ||
    pathname.startsWith("/signup"))
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/signIn", "/signup", "/verify"],
};
