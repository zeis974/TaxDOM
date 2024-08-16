import { NextResponse, userAgent } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { device } = userAgent(request)
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set("X-Device", `Vendor/${device.vendor},Type/${device.type}`)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  return response
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
