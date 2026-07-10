import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { BoatIcon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Workspace" title="Boats" description="Fleets of agents grouped for deployment." />
      <ComingSoon
        icon={BoatIcon}
        title="Boats aren't available yet"
        description="This surface isn't backed by the control plane yet. Check back soon."
      />
    </>
  );
}
