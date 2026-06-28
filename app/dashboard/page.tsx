import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiCloud01Icon,
  Activity01Icon,
  Rocket01Icon,
  Flash,
  PlusSignIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { RunsChart, RegionChart } from "@/components/dashboard/overview-charts";
import { deployments } from "@/lib/dashboard-data";

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Console"
        title="Overview"
        description="A live look at every agent, deployment, and tunnel running on Paperboat."
        actions={
          <>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/dashboard/usage" />}
            >
              View usage
            </Button>
            <Button size="lg" nativeButton={false} render={<Link href="/dashboard/agents" />}>
              <HugeiconsIcon icon={PlusSignIcon} />
              New agent
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active agents" value="119" delta="+8 this week" trend="up" icon={AiCloud01Icon} />
        <StatCard label="Runs / 24h" value="18.2K" delta="+12.4%" trend="up" icon={Activity01Icon} />
        <StatCard label="Deployments" value="47" delta="+3 today" trend="up" icon={Rocket01Icon} />
        <StatCard label="Avg latency" value="38ms" delta="-4ms" trend="up" icon={Flash} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RunsChart />
        <RegionChart />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="font-heading text-base font-semibold">
              Recent deployments
            </CardTitle>
            <CardDescription>Latest rollouts across your workspace</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/dashboard/deployments" />}
          >
            View all
            <HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden md:table-cell">Duration</TableHead>
                <TableHead className="text-right">When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.agent}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {d.version}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {d.author}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                    {d.duration}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {d.when}
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
