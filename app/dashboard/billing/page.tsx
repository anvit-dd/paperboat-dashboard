"use client";

import * as React from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Coins01Icon,
  CreditCardIcon,
  CustomerSupportIcon,
  DatabaseIcon,
  EarthIcon,
  Folder01Icon,
  InformationCircleIcon,
  Link01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { listCatalogPlans } from "@/lib/api/catalog";
import type {
  BillingPlanProduct,
  CatalogPlan,
  Entitlement,
} from "@/lib/api/types";
import { formatCredits } from "@/lib/format";
import {
  getPlanPresentation,
  type PlanFeature,
  type PlanFeatureIcon,
} from "@/lib/billing/plan-presentation";
import { cn } from "@/lib/utils";

function formatPeriod(e: Entitlement): string | null {
  if (!e.current_period_end) return null;
  const end = new Date(e.current_period_end).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `Renews ${end}`;
}

const FEATURE_ICONS = {
  credits: Coins01Icon,
  storage: DatabaseIcon,
  projects: Folder01Icon,
  regions: EarthIcon,
  agentunnel: Link01Icon,
  support: CustomerSupportIcon,
  feature: InformationCircleIcon,
} satisfies Record<PlanFeatureIcon, typeof Coins01Icon>;

function FeatureLabel({ children }: { children: string }) {
  return children.split(/(\d[\d,.]*)/g).map((part, index) =>
    /^\d/.test(part) ? (
      <strong
        key={`${part}-${index}`}
        className="font-semibold tabular-nums text-foreground"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function BillingPage() {
  const { data, error, loading } = useApi<Entitlement>(getEntitlement);
  const planProducts = useApi<BillingPlanProduct[]>(listBillingPlanProducts);
  const catalogPlans = useApi<CatalogPlan[]>(listCatalogPlans);
  const [opening, setOpening] = React.useState(false);
  const [changingPlan, setChangingPlan] = React.useState<string | null>(null);
  const [checkingOut, setCheckingOut] = React.useState<string | null>(null);
  const isFreePlan = data?.plan_code === "free" || data?.state === "free";
  const canOpenPortal = Boolean(data?.active && !isFreePlan);
  const plans = React.useMemo(() => {
    const paid = (planProducts.data ?? []).map((plan) => ({
      ...plan,
      product_code: plan.code,
    }));
    // Free plans have no billing product; surface them from the catalog with
    // an empty product_code so no checkout is offered for them.
    const paidCodes = new Set(paid.map((plan) => plan.plan_code));
    const free = (catalogPlans.data ?? [])
      .filter(
        (plan) =>
          plan.active &&
          !paidCodes.has(plan.code) &&
          getPlanPresentation(plan)?.priceMonthlyUsd === 0,
      )
      .map((plan) => ({
        code: plan.code,
        plan_code: plan.code,
        plan_name: plan.name,
        included_credits: plan.included_credits,
        included_storage_gb: plan.included_storage_gb,
        metadata: plan.metadata,
        product_code: "",
      }));
    return [...free, ...paid].sort(
      (a, b) => Number(a.included_credits) - Number(b.included_credits),
    );
  }, [planProducts.data, catalogPlans.data]);

  async function openPortal(planCode: string | null = null) {
    if (!canOpenPortal) {
      toast.error("Billing portal isn't available yet.", {
        description: "Choose a plan first, then you can manage billing details here.",
      });
      return;
    }
    setChangingPlan(planCode);
    setOpening(true);
    try {
      const { url } = await createCustomerPortal(window.location.href);
      window.location.assign(url);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong.";
      toast.error("Couldn't open the billing portal.", { description: message });
      setOpening(false);
      setChangingPlan(null);
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
        <div className="flex flex-col gap-6">
          <section aria-labelledby="plans-heading" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="plans-heading" className="font-heading text-base font-semibold">
                Plans
              </h2>
              <p className="text-sm text-muted-foreground">
                Compare credits, storage, project limits, region access, and support.
              </p>
            </div>

            {planProducts.loading || catalogPlans.loading ? (
              <div className="flex min-h-44 items-center justify-center rounded-lg border border-border">
                <Spinner className="size-5 text-muted-foreground" />
              </div>
            ) : planProducts.error || catalogPlans.error ? (
              <Empty className="min-h-44 border">
                <EmptyHeader>
                  <EmptyTitle className="font-heading">Couldn&apos;t load plans</EmptyTitle>
                  <EmptyDescription>
                    {(planProducts.error ?? catalogPlans.error)?.message}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : plans.length === 0 ? (
              <Empty className="min-h-44 border">
                <EmptyHeader>
                  <EmptyTitle className="font-heading">No plans available</EmptyTitle>
                  <EmptyDescription>
                    Plan products are configured in the billing catalog.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
                {plans.map((plan) => {
                  const isCurrentPlan =
                    Boolean(data?.active) && data?.plan_code === plan.plan_code;
                  const changingThisPlan =
                    opening && changingPlan === plan.product_code;
                  const purchasable = plan.product_code !== "";
                  const presentation = getPlanPresentation(plan);
                  const isPopular = Boolean(presentation?.mostPopular);
                  const features: PlanFeature[] = [
                    {
                      label: `${formatCredits(plan.included_credits)} credits`,
                      icon: "credits",
                    },
                    {
                      label: `${plan.included_storage_gb} GB storage`,
                      icon: "storage",
                    },
                    ...(presentation?.features ?? []),
                  ];

                  return (
                    <Card
                      key={plan.code}
                      className={cn(
                        "gap-0 py-0",
                        isPopular
                          ? "rounded-xl shadow-md ring-2 ring-primary"
                          : "md:my-4",
                      )}
                    >
                      {isPopular ? (
                        <p className="bg-primary pb-3 pt-1 text-center font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground">
                          Most popular
                        </p>
                      ) : null}
                      <CardHeader
                        className={cn(
                          "border-b border-border p-6 pb-5",
                          isPopular && "-mt-2 bg-card pt-8",
                        )}
                      >
                        <CardTitle className="flex items-center justify-between gap-3 font-heading text-base font-semibold">
                          {plan.plan_name}
                          {isCurrentPlan ? (
                            <Badge variant="secondary">Current</Badge>
                          ) : null}
                        </CardTitle>
                        <CardDescription>
                          {presentation?.tagline ??
                            `${plan.included_storage_gb} GB storage included`}
                        </CardDescription>
                        <p className="pt-3 font-heading text-3xl font-semibold tabular-nums">
                          {presentation ? (
                            <>
                              ${presentation.priceMonthlyUsd}
                              <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">
                                /mo
                              </span>
                            </>
                          ) : (
                            <>
                              {formatCredits(plan.included_credits)}
                              <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">
                                credits
                              </span>
                            </>
                          )}
                        </p>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col gap-3 p-6">
                        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          What&apos;s included
                        </p>
                        <ul className="flex flex-col gap-2">
                          {features.map((feature) => (
                            <li
                              key={`${feature.icon}-${feature.label}`}
                              className="flex items-start gap-2 text-sm"
                            >
                              <HugeiconsIcon
                                icon={FEATURE_ICONS[feature.icon]}
                                className="mt-0.5 size-4 shrink-0 text-primary"
                              />
                              <span>
                                <FeatureLabel>{feature.label}</FeatureLabel>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          variant={
                            isCurrentPlan
                              ? "secondary"
                              : isPopular
                                ? "default"
                                : "outline"
                          }
                          className="w-full"
                          onClick={() =>
                            canOpenPortal
                              ? openPortal(plan.product_code || null)
                              : startCheckout(plan.product_code)
                          }
                          disabled={
                            isCurrentPlan ||
                            opening ||
                            checkingOut !== null ||
                            (!purchasable && !canOpenPortal)
                          }
                        >
                          {checkingOut === plan.product_code ||
                          changingThisPlan ? (
                            <Spinner data-icon="inline-start" />
                          ) : null}
                          {isCurrentPlan
                            ? "Current plan"
                            : canOpenPortal
                              ? "Change plan"
                              : `Choose ${plan.plan_name}`}
                          {!isCurrentPlan &&
                          checkingOut !== plan.product_code &&
                          !changingThisPlan ? (
                            <HugeiconsIcon
                              icon={canOpenPortal ? CreditCardIcon : ArrowRight01Icon}
                              data-icon="inline-end"
                            />
                          ) : null}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex-row items-start justify-between">
                <div className="flex flex-col gap-1">
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
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {data?.active
                    ? isFreePlan
                      ? "Your free plan is active. Upgrade when you need more credits or storage."
                      : "Your plan is active. Manage changes, payment details, and invoices through the billing portal."
                    : "Choose a plan to start using Paperboat."}
                </p>
              </CardContent>
              {!isFreePlan ? (
                <CardFooter>
                  <Button
                    onClick={() => openPortal()}
                    disabled={opening || !canOpenPortal}
                  >
                    {opening && changingPlan === null ? (
                      <Spinner data-icon="inline-start" />
                    ) : (
                      <HugeiconsIcon icon={CreditCardIcon} data-icon="inline-start" />
                    )}
                    Open billing portal
                  </Button>
                </CardFooter>
              ) : null}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-base font-semibold">
                  Payment
                </CardTitle>
                <CardDescription>Managed by our billing provider</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
              {!isFreePlan ? (
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => openPortal()}
                    disabled={opening || !canOpenPortal}
                  >
                    Manage payment
                  </Button>
                </CardFooter>
              ) : null}
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
