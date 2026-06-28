import { HugeiconsIcon } from "@hugeicons/react";
import { Rocket01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons";

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
import { StatusBadge } from "@/components/dashboard/status-badge";
import { deployments } from "@/lib/dashboard-data";

export default function DeploymentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Observability"
        title="Deployments"
        description="Every rollout across your workspace, with build status and rollback history."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={Rocket01Icon} />
            Deploy
          </Button>
        }
      />

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deployment</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Duration</TableHead>
                <TableHead className="text-right">When</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {d.id}
                  </TableCell>
                  <TableCell className="font-medium">{d.agent}</TableCell>
                  <TableCell className="font-mono text-xs">{d.version}</TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {d.author}
                  </TableCell>
                  <TableCell className="hidden text-right font-mono text-xs text-muted-foreground lg:table-cell">
                    {d.duration}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {d.when}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-sm" aria-label="View source">
                      <HugeiconsIcon icon={SourceCodeIcon} />
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
