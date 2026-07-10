"use client";

import { CreditCardIcon, Database01Icon } from "@hugeicons/core-free-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useApi } from "@/lib/api/use-api";
import { getUsage } from "@/lib/api/billing";
import type { Usage } from "@/lib/api/types";

export default function UsagePage() {
  const { data, error, loading } = useApi<Usage>(getUsage);

  const storagePct =
    data && data.included_storage_gb + data.purchased_storage_gb > 0
      ? Math.min(
          100,
          Math.round(
            (data.allocated_storage_gb /
              (data.included_storage_gb + data.purchased_storage_gb)) *
              100,
          ),
        )
      : 0;

  return (
    <>
      <PageHeader
        eyebrow="Observability"
        title="Usage"
        description="Your credit balance and storage allocation across the platform."
      />

      {loading ? (
        <div className="flex flex-1 items-center justify-center py-16">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
      ) : error || !data ? (
        <Empty className="min-h-[16rem] border">
          <EmptyHeader>
            <EmptyTitle className="font-heading">Couldn&apos;t load usage</EmptyTitle>
            <EmptyDescription>
              {error?.message ?? "Usage data is unavailable."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Credits"
              value={data.credits_balance}
              icon={CreditCardIcon}
              trend="flat"
            />
            <StatCard
              label="Included storage"
              value={`${data.included_storage_gb} GB`}
              icon={Database01Icon}
              trend="flat"
            />
            <StatCard
              label="Purchased storage"
              value={`${data.purchased_storage_gb} GB`}
              icon={Database01Icon}
              trend="flat"
            />
            <StatCard
              label="Available storage"
              value={`${data.available_storage_gb} GB`}
              icon={Database01Icon}
              trend="flat"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base font-semibold">
                Storage allocation
              </CardTitle>
              <CardDescription>
                {data.allocated_storage_gb} GB allocated of{" "}
                {data.included_storage_gb + data.purchased_storage_gb} GB total
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={storagePct} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{storagePct}% allocated</span>
                <span>{data.available_storage_gb} GB free</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
