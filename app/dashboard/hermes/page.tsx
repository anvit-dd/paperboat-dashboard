import { HugeiconsIcon } from "@hugeicons/react";
import {
  CloudServerIcon,
  Activity01Icon,
  Flash,
  Database01Icon,
  PlusSignIcon,
  GlobeIcon,
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
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";

const instances = [
  { id: "herm_prod", name: "hermes-prod", tier: "Scale · 3 nodes", region: "us-east", status: "healthy" as const, throughput: "14.2k msg/s", queue: "1.1k" },
  { id: "herm_eu", name: "hermes-eu", tier: "Standard · 2 nodes", region: "eu-central", status: "healthy" as const, throughput: "6.8k msg/s", queue: "320" },
  { id: "herm_stg", name: "hermes-staging", tier: "Dev · 1 node", region: "us-west", status: "degraded" as const, throughput: "0.4k msg/s", queue: "12.4k" },
];

export default function HermesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Hosted Hermes"
        description="Fully managed message bus for agent-to-agent and agent-to-tool communication. Durable, ordered, and globally replicated."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={PlusSignIcon} />
            New instance
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Throughput" value="21.4k/s" delta="+9%" trend="up" icon={Activity01Icon} />
        <StatCard label="P99 latency" value="12ms" delta="-2ms" trend="up" icon={Flash} />
        <StatCard label="Messages / 24h" value="1.84B" delta="+6%" trend="up" icon={Database01Icon} />
        <StatCard label="Instances" value="3" trend="flat" delta="2 regions" icon={CloudServerIcon} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {instances.map((i) => (
          <Card key={i.id}>
            <CardHeader className="flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="font-heading text-base font-semibold">
                  {i.name}
                </CardTitle>
                <CardDescription>{i.tier}</CardDescription>
              </div>
              <StatusBadge status={i.status} />
            </CardHeader>
            <CardContent className="space-y-3">
              <dl className="grid grid-cols-2 gap-y-2.5 text-sm">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  <HugeiconsIcon icon={GlobeIcon} className="size-3.5" /> Region
                </dt>
                <dd className="text-right font-mono text-xs">{i.region}</dd>
                <dt className="text-muted-foreground">Throughput</dt>
                <dd className="text-right tabular-nums">{i.throughput}</dd>
                <dt className="text-muted-foreground">Queue depth</dt>
                <dd className="text-right tabular-nums">{i.queue}</dd>
              </dl>
              <div className="flex gap-2 border-t border-border pt-3">
                <Button variant="outline" size="sm" className="flex-1">Metrics</Button>
                <Button variant="outline" size="sm" className="flex-1">Configure</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
