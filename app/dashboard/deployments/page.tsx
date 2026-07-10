import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { Rocket01Icon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Workspace" title="Deployments" description="Rollouts and version history across your projects." />
      <ComingSoon
        icon={Rocket01Icon}
        title="Deployments aren't available yet"
        description="This surface isn't backed by the control plane yet. Check back soon."
      />
    </>
  );
}
