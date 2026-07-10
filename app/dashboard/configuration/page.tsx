import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { Configuration01Icon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Workspace" title="Configuration" description="Workspace-wide defaults and configuration variables." />
      <ComingSoon
        icon={Configuration01Icon}
        title="Configuration isn't available yet"
        description="This surface isn't backed by the control plane yet. Check back soon."
      />
    </>
  );
}
