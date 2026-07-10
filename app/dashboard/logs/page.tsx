import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { TerminalIcon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Logs" description="Live logs streamed from your machines and agents." />
      <ComingSoon
        icon={TerminalIcon}
        title="Logs aren't available yet"
        description="Log streaming will appear here once the control plane exposes it."
      />
    </>
  );
}
