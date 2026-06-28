import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  Activity01Icon,
  Cpu,
  Database01Icon,
  CreditCardIcon,
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
import { RunsChart, ComputeChart } from "@/components/dashboard/overview-charts";

const breakdown = [
  { label: "Compute (vCPU-hours)", value: "12,480", cost: "$312.00" },
  { label: "Hermes messages", value: "1.84B", cost: "$92.00" },
  { label: "Storage (GB-months)", value: "1,436", cost: "$43.08" },
  { label: "Tunnel egress (GB)", value: "884", cost: "$35.02" },
];

export default function UsagePage() {
  return (
    <>
      <PageHeader
        eyebrow="Observability"
        title="Usage"
        description="Track consumption and projected spend across every Paperboat product."
        actions={
          <Button variant="outline" size="lg">
            <HugeiconsIcon icon={Download01Icon} />
            Export CSV
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Runs / mo" value="486K" delta="+12%" trend="up" icon={Activity01Icon} />
        <StatCard label="vCPU-hours" value="12.5K" delta="+8%" trend="up" icon={Cpu} />
        <StatCard label="Storage" value="1.40 TB" delta="+4%" trend="up" icon={Database01Icon} />
        <StatCard label="Est. spend" value="$482" delta="of $600 cap" trend="flat" icon={CreditCardIcon} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RunsChart />
        <ComputeChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base font-semibold">
            Cost breakdown
          </CardTitle>
          <CardDescription>Current billing period · Jun 2026</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {breakdown.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span className="text-sm">{row.label}</span>
              <div className="flex items-center gap-6">
                <span className="tabular-nums text-sm text-muted-foreground">{row.value}</span>
                <span className="w-20 text-right tabular-nums text-sm font-medium">{row.cost}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm font-semibold">Total</span>
            <span className="font-heading text-lg font-semibold tabular-nums">$482.10</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
