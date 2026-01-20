import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function proxy(req) {
    const path = req.nextUrl.pathname;
    const pathProtectedRoute = ["/dashboard", "/profil"];
    const isProtectedRoute = pathProtectedRoute.includes(path);
    const sessionCookie = (await cookies()).get("auth_token");
    const isPublicRoute = ["/"].includes(path);

    // Vérifie que l'utilisateur est bien connecté.
    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // Si l'utilisateur est déjà connecté et va sur la page de
    // connexion on le redirige sur la page dashboard.
    if (isPublicRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
