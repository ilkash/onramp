import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;
  const isLogin = pathname === "/login";
  const isAdminLogin = pathname === "/admin-login";
  const isAdminPage = pathname.startsWith("/admin");
  const isIndividualPage = pathname.startsWith("/cabinet-individual");
  const isCompanyPage = pathname.startsWith("/cabinet-company");

  if (!token && !isLogin && !isAdminLogin) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
    if (isIndividualPage || isCompanyPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token && (isLogin || isAdminLogin)) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/accounts", request.url));
    }
    if (role === "INDIVIDUAL") {
      return NextResponse.redirect(
        new URL("/cabinet-individual/profile", request.url),
      );
    }
    if (role === "COMPANY") {
      return NextResponse.redirect(
        new URL("/cabinet-company/profile", request.url),
      );
    }
  }

  if (token && role === "INDIVIDUAL") {
    if (isCompanyPage || isAdminPage) {
      return NextResponse.redirect(
        new URL("/cabinet-individual/profile", request.url),
      );
    }
  }
  if (token && role === "COMPANY") {
    if (isIndividualPage || isAdminPage) {
      return NextResponse.redirect(
        new URL("/cabinet-company/profile", request.url),
      );
    }
  }
  if (token && role === "ADMIN") {
    if (isIndividualPage || isCompanyPage) {
      return NextResponse.redirect(new URL("/admin/accounts", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/admin/:path*",
    "/cabinet-individual/:path*",
    "/cabinet-company/:path*",
    "/login",
    "/admin-login",
  ],
};
