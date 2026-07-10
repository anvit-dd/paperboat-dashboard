import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { UserGroupIcon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Teams" description="Invite members and manage roles across your workspace." />
      <ComingSoon
        icon={UserGroupIcon}
        title="Teams aren't available yet"
        description="Team management will appear here once the control plane exposes it."
      />
    </>
  );
}
