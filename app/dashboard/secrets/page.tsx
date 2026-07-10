import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { AiLockIcon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Platform" title="Secrets" description="Encrypted secrets injected into your machines at runtime." />
      <ComingSoon
        icon={AiLockIcon}
        title="Secrets aren't available yet"
        description="Secret management will appear here once the control plane exposes it."
      />
    </>
  );
}
