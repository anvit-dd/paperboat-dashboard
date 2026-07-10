import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { AiCloud01Icon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Workspace" title="Remote agents" description="Agents connected from your own machines." />
      <ComingSoon
        icon={AiCloud01Icon}
        title="Remote agents aren't available yet"
        description="This surface isn't backed by the control plane yet. Check back soon."
      />
    </>
  );
}
