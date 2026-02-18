import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "./getUserToken/getUserToken";

const protectedPages = ["/Cart"];
const authPages = ["/Login", "/Register"];

export async function middleware(req: NextRequest) {
  const token = await getUserToken();
  const { pathname } = req.nextUrl;

  // Protected pages → require token
  if (protectedPages.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/Login", req.url));
    }
  }

  // Auth pages → block if already logged in
  if (authPages.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
