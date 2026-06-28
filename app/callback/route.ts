import { handleAuth } from "@workos-inc/authkit-nextjs";

// Handles the OAuth/Magic-link callback from WorkOS, exchanges the code for a
// session, and redirects the user. Matches NEXT_PUBLIC_WORKOS_REDIRECT_URI.
export const GET = handleAuth({ returnPathname: "/dashboard" });
