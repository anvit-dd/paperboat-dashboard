import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { TrainFrontTunnel } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Platform" title="AgenTunnel" description="Secure tunnels and preview URLs for your machines." />
      <ComingSoon
        icon={TrainFrontTunnel}
        title="Tunnels aren't available yet"
        description="Tunnel management will appear here once the control plane exposes it."
      />
    </>
  );
}
