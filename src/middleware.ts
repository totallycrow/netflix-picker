// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  //   if (request.nextUrl.pathname.startsWith("/about")) {
  //     return NextResponse.rewrite(new URL("/about-2", request.url));
  //   }
  //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //     return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  //   }
  const cookie = request.cookies.get("sessionId")?.value;
  console.log("COOKIE");
  console.log(cookie);

  if (!cookie) return;
  const isAuthorized = cookie.length === 40;
  console.log(isAuthorized);

  if (request.nextUrl.pathname.startsWith("/dashboard") && isAuthorized) {
    return NextResponse.redirect(new URL("/about-2", request.url));
  }
}

// export function middleware(request: NextRequest) {
//   // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
//   // Getting cookies from the request using the `RequestCookies` API
//   const cookie = request.cookies.get("nextjs")?.value;
//   console.log(cookie); // => 'fast'
//   const allCookies = request.cookies.getAll();
//   console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

//   request.cookies.has("nextjs"); // => true
//   request.cookies.delete("nextjs");
//   request.cookies.has("nextjs"); // => false

//   // Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next();
//   response.cookies.set("vercel", "fast");
//   response.cookies.set({
//     name: "vercel",
//     value: "fast",
//     path: "/test",
//   });
//   const cookie2 = response.cookies.get("vercel");
//   console.log(cookie2); // => { name: 'vercel', value: 'fast', Path: '/test' }
//   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

//   return response;
// }

// export const config = {
//     matcher: '/about/:path*',
//   }
