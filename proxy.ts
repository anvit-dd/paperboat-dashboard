import { authkitProxy } from "@workos-inc/authkit-nextjs";

// Next.js 16 renamed `middleware` to `proxy`. AuthKit's `authkitProxy`
// keeps the session cookie fresh on every matched request.
export default authkitProxy();

export const config = {
  // Run on all routes except Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
