import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  Download01Icon,
  CreditCardIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { invoices } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const planFeatures = [
  "Up to 50 cloud agents",
  "Unlimited remote runners",
  "5 Hermes instances",
  "Priority support",
];

export default function BillingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Billing"
        description="Manage your plan, payment method, and invoices."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="font-heading text-base font-semibold">
                Scale plan
              </CardTitle>
              <CardDescription>Billed monthly · renews Jul 1, 2026</CardDescription>
            </div>
            <Badge>Current</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-semibold">$400</span>
              <span className="text-sm text-muted-foreground">/ month + usage</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {planFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    className="size-4 text-emerald-500"
                  />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 border-t border-border pt-4">
              <Button variant="outline">Change plan</Button>
              <Button variant="ghost">Cancel subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base font-semibold">
              Payment method
            </CardTitle>
            <CardDescription>Used for all charges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <HugeiconsIcon icon={CreditCardIcon} className="size-4" />
              </span>
              <div className="text-sm">
                <p className="font-medium">Visa •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 09 / 27</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">Update card</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base font-semibold">Invoices</CardTitle>
          <CardDescription>Download past statements</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Period</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="pr-6 text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="pl-6 font-medium">{inv.period}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {inv.id}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={inv.status === "Paid" ? "secondary" : "outline"}
                      className={cn(
                        inv.status === "Paid" &&
                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                        inv.status === "Due" &&
                          "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      )}
                    >
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{inv.amount}</TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button variant="ghost" size="icon-sm" aria-label="Download invoice">
                      <HugeiconsIcon icon={Download01Icon} />
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
