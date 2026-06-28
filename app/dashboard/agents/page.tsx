import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Search01Icon,
  AiCloud01Icon,
  Activity01Icon,
  Flash,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { agents } from "@/lib/dashboard-data";

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Cloud Agents"
        description="Long-running, isolated agents with durable compute and storage."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={PlusSignIcon} />
            New agent
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total agents" value="12" delta="+2" trend="up" icon={AiCloud01Icon} />
        <StatCard label="Running now" value="9" icon={Activity01Icon} trend="flat" delta="75%" />
        <StatCard label="Avg latency" value="41ms" delta="-6ms" trend="up" icon={Flash} />
      </div>

      <Card className="py-0">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 max-w-xs">
              <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <HugeiconsIcon icon={Search01Icon} className="size-3.5" />
              </span>
              <input
                type="search"
                placeholder="Filter agents…"
                className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>
            <Button variant="outline" size="sm">All regions</Button>
            <Button variant="outline" size="sm">Status</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead className="hidden md:table-cell">Model</TableHead>
                <TableHead className="hidden lg:table-cell">Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Runs</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Uptime</TableHead>
                <TableHead className="text-right">Updated</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{a.name}</span>
                      <span className="font-mono text-[0.6875rem] text-muted-foreground">
                        {a.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {a.model}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground lg:table-cell">
                    {a.region}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={a.status} />
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums sm:table-cell">
                    {a.runs.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums text-muted-foreground lg:table-cell">
                    {a.uptime}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {a.updated}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-sm" aria-label="Actions">
                      <HugeiconsIcon icon={MoreHorizontalIcon} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
