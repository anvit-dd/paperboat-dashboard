import { PageHeader } from "@/components/dashboard/page-header";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { Database01Icon } from "@hugeicons/core-free-icons";

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Storage" description="Volumes and storage allocation across your projects." />
      <ComingSoon
        icon={Database01Icon}
        title="Storage details aren't available yet"
        description="See your storage totals on the Usage page. Per-volume details are coming soon."
      />
    </>
  );
}
