import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Key01Icon,
  Copy01Icon,
  MoreHorizontalIcon,
  Shield01Icon,
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
import { apiKeys } from "@/lib/dashboard-data";

export default function ApiKeysPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="API Keys"
        description="Programmatic access to the Paperboat API. Treat keys like passwords — they grant full scope access."
        actions={
          <Button size="lg">
            <HugeiconsIcon icon={PlusSignIcon} />
            Create key
          </Button>
        }
      />

      <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
        <HugeiconsIcon icon={Shield01Icon} className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Keys are shown only once at creation. Store them in a secret manager and rotate
          regularly. Revoking a key takes effect immediately across all regions.
        </p>
      </div>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead className="hidden md:table-cell">Scope</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="text-right">Last used</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <HugeiconsIcon icon={Key01Icon} className="size-3.5" />
                      </span>
                      <span className="font-medium">{k.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <code className="font-mono text-xs text-muted-foreground">{k.prefix}</code>
                      <Button variant="ghost" size="icon-xs" aria-label="Copy key">
                        <HugeiconsIcon icon={Copy01Icon} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                    {k.scope}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {k.created}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {k.lastUsed}
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
