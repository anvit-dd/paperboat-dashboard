import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { CloudServerIcon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Platform" title="Hermes" description="Managed message and event delivery for your agents." />
      <ComingSoon
        icon={CloudServerIcon}
        title="Hermes isn't available yet"
        description="This surface isn't backed by the control plane yet. Check back soon."
      />
    </>
  );
}
