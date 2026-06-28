import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, HardDriveIcon, Database01Icon } from "@hugeicons/core-free-icons";

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
import { volumes } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export default function StoragePage() {
  const totalUsed = volumes.reduce((s, v) => s + v.used, 0);
  const totalSize = volumes.reduce((s, v) => s + v.size, 0);

  return (
    <>
      <PageHeader
        eyebrow="Observability"
        title="Storage"
        description="Durable, encrypted volumes that persist agent state, vector indexes, and run artifacts across restarts."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={PlusSignIcon} />
            New volume
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total used"
          value={`${(totalUsed / 1024).toFixed(2)} TB`}
          delta={`${Math.round((totalUsed / totalSize) * 100)}%`}
          trend="flat"
          icon={Database01Icon}
        />
        <StatCard label="Volumes" value={String(volumes.length)} trend="flat" delta="4 regions" icon={HardDriveIcon} />
        <StatCard label="Provisioned" value={`${(totalSize / 1024).toFixed(2)} TB`} trend="up" delta="+256 GB" icon={HardDriveIcon} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base font-semibold">Volumes</CardTitle>
          <CardDescription>Capacity and health per volume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {volumes.map((v) => {
            const pct = Math.round((v.used / v.size) * 100);
            return (
              <div key={v.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <HugeiconsIcon icon={HardDriveIcon} className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="font-mono text-[0.6875rem] text-muted-foreground">
                        {v.region} · {v.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {v.used} / {v.size} GB
                    </span>
                    <StatusBadge status={v.status} />
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      pct > 85 ? "bg-amber-500" : "bg-primary",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
