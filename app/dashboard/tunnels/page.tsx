import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  LinkSquare02Icon,
  Copy01Icon,
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
import { StatusBadge } from "@/components/dashboard/status-badge";
import { tunnels } from "@/lib/dashboard-data";

export default function TunnelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="AgenTunnel"
        description="Secure, low-latency ingress that exposes any agent or service behind a stable public endpoint — no firewall changes required."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={PlusSignIcon} />
            New tunnel
          </Button>
        }
      />

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tunnel</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="hidden lg:table-cell">Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Requests</TableHead>
                <TableHead className="text-right">Latency</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tunnels.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <HugeiconsIcon
                        icon={LinkSquare02Icon}
                        className="size-3.5 text-muted-foreground"
                      />
                      <span className="font-mono text-xs text-primary">{t.endpoint}</span>
                      <Button variant="ghost" size="icon-xs" aria-label="Copy endpoint">
                        <HugeiconsIcon icon={Copy01Icon} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground lg:table-cell">
                    {t.target}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={t.status} />
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums sm:table-cell">
                    {t.requests}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {t.latency}
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
