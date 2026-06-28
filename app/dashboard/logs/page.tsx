import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { LogViewer } from "@/components/dashboard/log-viewer";

export default function LogsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Observability"
        title="Logs"
        description="A unified, streaming view of stdout, tool calls, and system events across every agent."
        actions={
          <Button variant="outline" size="lg">
            <HugeiconsIcon icon={Download01Icon} />
            Export
          </Button>
        }
      />
      <LogViewer />
    </>
  );
}
