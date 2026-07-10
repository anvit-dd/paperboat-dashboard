import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { KeyIcon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Account" title="API keys" description="Programmatic access tokens for the Paperboat API." />
      <ComingSoon
        icon={KeyIcon}
        title="API keys aren't available yet"
        description="Key management will appear here once the control plane exposes it."
      />
    </>
  );
}
