"use client";

import * as React from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, CreditCardIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useApi } from "@/lib/api/use-api";
import { ApiError } from "@/lib/api/client";
import {
  createCheckout,
  getEntitlement,
  createCustomerPortal,
  listBillingPlanProducts,
} from "@/lib/api/billing";
import type { BillingPlanProduct, Entitlement } from "@/lib/api/types";

function formatPeriod(e: Entitlement): string | null {
  if (!e.current_period_end) return null;
  const end = new Date(e.current_period_end).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `Renews ${end}`;
}

export default function BillingPage() {
  const { data, error, loading } = useApi<Entitlement>(getEntitlement);
  const planProducts = useApi<BillingPlanProduct[]>(listBillingPlanProducts);
  const [opening, setOpening] = React.useState(false);
  const [checkingOut, setCheckingOut] = React.useState<string | null>(null);
  const isFreePlan = data?.plan_code === "free" || data?.state === "free";
  const canOpenPortal = Boolean(data?.active && !isFreePlan);
  const paidPlans = planProducts.data ?? [];

  async function openPortal() {
    if (!canOpenPortal) {
      toast.error("Billing portal isn't available yet.", {
        description: "Choose a plan first, then you can manage billing details here.",
      });
      return;
    }
    setOpening(true);
    try {
      const { url } = await createCustomerPortal(window.location.href);
      window.location.assign(url);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong.";
      toast.error("Couldn't open the billing portal.", { description: message });
      setOpening(false);
    }
  }

  async function startCheckout(productCode: string) {
    setCheckingOut(productCode);
    try {
      const successUrl = new URL("/dashboard/billing", window.location.origin);
      successUrl.searchParams.set("checkout", "success");
      const { url } = await createCheckout(productCode, successUrl.toString());
      window.location.assign(url);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong.";
      toast.error("Couldn't start checkout.", { description: message });
      setCheckingOut(null);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Billing"
        description="Manage your plan and payment method through the billing portal."
      />

      {loading ? (
        <div className="flex flex-1 items-center justify-center py-16">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
      ) : error ? (
        <Empty className="min-h-[16rem] border">
          <EmptyHeader>
            <EmptyTitle className="font-heading">Couldn&apos;t load billing</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="font-heading text-base font-semibold">
                  {data?.plan_name || data?.plan_code || "No active plan"}
                </CardTitle>
                <CardDescription>
                  {formatPeriod(data!) ?? "No billing period"}
                </CardDescription>
              </div>
              <Badge
                variant={data?.active ? "secondary" : "outline"}
                className="capitalize"
              >
                {data?.state ?? "inactive"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.active ? (
                <p className="text-sm text-muted-foreground">
                  {isFreePlan
                    ? "Your free plan is active. You can create projects now, and upgrade when you need more capacity."
                    : "Your plan is active. Use the billing portal to change plan, update your card, or view invoices."}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Choose a plan to start using Paperboat.
                </p>
              )}
              {!data?.active || isFreePlan ? (
                <div className="grid gap-3 md:grid-cols-3">
                  {planProducts.loading ? (
                    <div className="flex min-h-44 items-center justify-center rounded-lg border border-border md:col-span-3">
                      <Spinner className="size-5 text-muted-foreground" />
                    </div>
                  ) : planProducts.error ? (
                    <Empty className="min-h-44 border md:col-span-3">
                      <EmptyHeader>
                        <EmptyTitle className="font-heading">
                          Couldn&apos;t load plans
                        </EmptyTitle>
                        <EmptyDescription>{planProducts.error.message}</EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  ) : paidPlans.length === 0 ? (
                    <Empty className="min-h-44 border md:col-span-3">
                      <EmptyHeader>
                        <EmptyTitle className="font-heading">
                          No paid plans available
                        </EmptyTitle>
                        <EmptyDescription>
                          Plan products are configured in the billing catalog.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  ) : (
                    paidPlans.map((plan) => (
                      <div
                        key={plan.code}
                        className="flex min-h-44 flex-col rounded-lg border border-border p-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-heading text-sm font-semibold">
                                {plan.plan_name}
                              </h3>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {plan.included_storage_gb} GB storage included
                              </p>
                            </div>
                          </div>
                          <p className="font-heading text-2xl font-semibold tabular-nums">
                            {plan.included_credits}
                            <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
                              credits
                            </span>
                          </p>
                        </div>
                        <Button
                          className="mt-auto w-full"
                          onClick={() => startCheckout(plan.code)}
                          disabled={checkingOut !== null}
                        >
                          {checkingOut === plan.code ? (
                            <Spinner className="size-4" />
                          ) : (
                            <HugeiconsIcon icon={ArrowRight01Icon} />
                          )}
                          Choose {plan.plan_name}
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              ) : null}
              {!isFreePlan ? (
                <div className="border-t border-border pt-4">
                  <Button onClick={openPortal} disabled={opening || !canOpenPortal}>
                    {opening ? (
                      <Spinner className="size-4" />
                    ) : (
                      <HugeiconsIcon icon={CreditCardIcon} />
                    )}
                    Open billing portal
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-base font-semibold">
                Payment
              </CardTitle>
              <CardDescription>Managed by our billing provider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <HugeiconsIcon icon={CreditCardIcon} className="size-4" />
                </span>
                <div className="text-sm">
                  <p className="font-medium">
                    {isFreePlan ? "No payment method required" : "Payment method on file"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isFreePlan
                      ? "Upgrade to add billing details."
                      : "Update it in the billing portal"}
                  </p>
                </div>
              </div>
              {!isFreePlan ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={openPortal}
                  disabled={opening || !canOpenPortal}
                >
                  Manage payment
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
