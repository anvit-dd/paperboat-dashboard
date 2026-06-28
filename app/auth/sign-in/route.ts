import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

// Route Handler (not a Server Component) so AuthKit can set its PKCE cookie,
// then redirect to the hosted AuthKit page (magic link / GitHub / Google).
export async function GET() {
  const signInUrl = await getSignInUrl();
  redirect(signInUrl);
}
