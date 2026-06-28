import { HugeiconsIcon } from "@hugeicons/react";
import {
  Robot01Icon,
  TerminalIcon,
  PlusSignIcon,
  Cpu,
  Copy01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";

const runners = [
  { id: "rnr_mac01", name: "anvit-macbook", os: "macOS 15.5 · arm64", status: "active" as const, cpu: "10 cores", region: "local" },
  { id: "rnr_gpu02", name: "gpu-box-west", os: "Ubuntu 24.04 · x86_64", status: "active" as const, cpu: "32 cores · A100", region: "us-west" },
  { id: "rnr_ci03", name: "ci-runner-3", os: "Ubuntu 24.04 · x86_64", status: "queued" as const, cpu: "8 cores", region: "eu-central" },
  { id: "rnr_edge4", name: "edge-pi-04", os: "Raspbian · arm64", status: "stopped" as const, cpu: "4 cores", region: "ap-south" },
];

export default function RemoteAgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Remote Agents"
        description="Bring your own compute. Connect any machine as a Paperboat runner and orchestrate it from the cloud."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={PlusSignIcon} />
            Add runner
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-base font-semibold">
            <HugeiconsIcon icon={TerminalIcon} className="size-4 text-primary" />
            Connect a new runner
          </CardTitle>
          <CardDescription>
            Run this on any machine to register it with your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-xs">
            <code className="truncate text-foreground">
              <span className="text-muted-foreground">$ </span>
              curl -fsSL paperboat.dev/install | sh &amp;&amp; paperboat runner connect --token pk_live_••••
            </code>
            <Button variant="ghost" size="icon-sm" aria-label="Copy command">
              <HugeiconsIcon icon={Copy01Icon} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {runners.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HugeiconsIcon icon={Robot01Icon} className="size-5" />
                </span>
                <StatusBadge status={r.status} />
              </div>
              <div className="space-y-1">
                <p className="font-medium">{r.name}</p>
                <p className="font-mono text-[0.6875rem] text-muted-foreground">{r.id}</p>
              </div>
              <dl className="grid grid-cols-2 gap-y-2 border-t border-border pt-3 text-xs">
                <dt className="text-muted-foreground">OS</dt>
                <dd className="text-right">{r.os}</dd>
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <HugeiconsIcon icon={Cpu} className="size-3" /> Compute
                </dt>
                <dd className="text-right">{r.cpu}</dd>
                <dt className="text-muted-foreground">Region</dt>
                <dd className="text-right font-mono">{r.region}</dd>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
