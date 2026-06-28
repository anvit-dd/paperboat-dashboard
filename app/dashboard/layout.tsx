import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate the whole dashboard segment. A plain redirect avoids writing cookies
  // during render for unauthenticated visitors.
  const { user } = await withAuth();
  if (!user && process.env.NODE_ENV !== "development") {
    redirect("/login");
  }
  const viewer = user ?? {
    email: "dinesh.dadape@gmail.com",
    firstName: "Anvit",
    lastName: "Dadape",
    profilePictureUrl: null,
  };

  async function signOutAction() {
    "use server";
    // WorkOS requires an absolute return_to URL (registered in the dashboard's
    // logout redirect allowlist), not a relative path.
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
    const proto = h.get("x-forwarded-proto") ?? "http";
    await signOut({ returnTo: `${proto}://${host}/login` });
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <TopNav
          user={{
            email: viewer.email,
            firstName: viewer.firstName,
            lastName: viewer.lastName,
            profilePictureUrl: viewer.profilePictureUrl,
          }}
          signOutAction={signOutAction}
        />
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
