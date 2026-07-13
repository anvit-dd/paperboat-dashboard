"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  Configuration01Icon,
  GitBranchIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { configSyncBadge, formatBytes, formatTimestamp } from "@/components/dashboard/config-sync-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useConfigSyncStatus } from "@/lib/api/config-sync";
import type { ConfigSyncMachineStatus, ConfigSyncPathSummary, ConfigSyncStatus } from "@/lib/api/types";

export default function ConfigurationPage() {
  const { data, error, loading } = useConfigSyncStatus();

  if (loading && !data) return <ConfigurationLoading />;
  if (!data) {
    return <ConfigurationError message={error?.message ?? "The control plane did not return a sync status."} />;
  }
  return <ConfigurationStatusView data={data} refreshError={error?.message} />;
}

export function ConfigurationStatusView({ data, refreshError }: { data: ConfigSyncStatus; refreshError?: string }) {
  const overall = configSyncBadge(data.state);
  const lastSuccessful = newestSuccessful(data.projects);
  const skipped = flattenSummaries(data.projects, "skipped");
  const conflicts = flattenSummaries(data.projects, "conflicts");
  const failures = data.projects.filter((item) => item.error_message);

  return (
    <>
      <PageHeader eyebrow="Workspace" title="Configuration" description="Portable agent settings synchronize automatically across every project machine." />

      {refreshError ? (
        <Alert>
          <HugeiconsIcon icon={Alert02Icon} />
          <AlertTitle>Configuration status could not be refreshed</AlertTitle>
          <AlertDescription>Showing the most recently received status. {refreshError}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Repository sync</CardTitle>
            <CardDescription>
              {data.repository.name ? `${data.repository.owner}/${data.repository.name}` : "No configuration repository has been provisioned."}
            </CardDescription>
            <CardAction><StatusBadge status={overall.status} label={overall.label} /></CardAction>
          </CardHeader>
          <CardContent className="grid gap-4 border-t pt-4 sm:grid-cols-3">
            <Metric label="Last successful sync" value={formatTimestamp(lastSuccessful)} />
            <Metric label="Branch" value={data.repository.branch || "Not available"} mono />
            <Metric label="Policy revision" value={data.policy.revision || "Not available"} mono />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer limits</CardTitle>
            <CardDescription>Files above these limits remain local and are reported below.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-end justify-between gap-4 border-t pt-4">
            <Metric label="Per file" value={formatBytes(data.policy.max_file_bytes)} />
            <Metric label="Per push" value={formatBytes(data.policy.max_batch_bytes)} />
            {data.repository.web_url ? (
              <Button size="sm" variant="outline" nativeButton={false} render={<a href={data.repository.web_url} target="_blank" rel="noreferrer" />}>
                <HugeiconsIcon icon={GitBranchIcon} /> Repository
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {failures.map((machine) => (
        <Alert key={machine.project_id} variant="destructive">
          <HugeiconsIcon icon={Alert02Icon} />
          <AlertTitle>{machine.project_name}: {machine.error_code?.replaceAll("_", " ") || "Sync failed"}</AlertTitle>
          <AlertDescription>{machine.error_message}</AlertDescription>
        </Alert>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Project machines</CardTitle>
          <CardDescription>Latest automatic sync state reported by each project machine.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {data.projects.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon"><HugeiconsIcon icon={Configuration01Icon} /></EmptyMedia>
                <EmptyTitle>No project machines yet</EmptyTitle>
                <EmptyDescription>Sync health will appear after the first project machine is created.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableCaption className="sr-only">Configuration synchronization status by project machine</TableCaption>
              <TableHeader><TableRow><TableHead className="pl-4">Project</TableHead><TableHead>Status</TableHead><TableHead>Pending</TableHead><TableHead>Last sync</TableHead><TableHead className="pr-4 text-right">Machine</TableHead></TableRow></TableHeader>
              <TableBody>
                {data.projects.map((machine) => {
                  const badge = configSyncBadge(machine.state);
                  return (
                    <TableRow key={`${machine.project_id}:${machine.machine_id}`}>
                      <TableCell className="pl-4"><Link className="font-medium hover:underline" href={`/dashboard/projects/${machine.project_id}`}>{machine.project_name}</Link></TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusBadge status={badge.status} label={badge.label} />
                          {machine.state === "idle" && machine.last_result_state ? <LastResult state={machine.last_result_state} /> : null}
                        </div>
                      </TableCell>
                      <TableCell>{machine.pending_path_count || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{formatTimestamp(machine.last_successful_sync_at)}</TableCell>
                      <TableCell className="max-w-48 truncate pr-4 text-right font-mono text-muted-foreground">{machine.machine_id || "Not allocated"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <IssueList title="Skipped files" description="Oversized or unsafe files that stayed on their source machine." items={skipped} empty="No files are being skipped." icon={InformationCircleIcon} />
        <IssueList title="Merge conflicts" description="Concurrent same-path changes preserved in the private configuration repository." items={conflicts} empty="No concurrent changes need attention." icon={CheckmarkCircle02Icon} repoURL={data.repository.web_url} />
      </div>
    </>
  );
}

function LastResult({ state }: { state: ConfigSyncMachineStatus["state"] }) {
  const badge = configSyncBadge(state);
  return <span className="text-xs text-muted-foreground">Last result: {badge.label}</span>;
}

function Metric({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className={mono ? "truncate font-mono text-sm font-medium" : "text-sm font-medium"}>{value}</p></div>;
}

function IssueList({ title, description, items, empty, icon, repoURL }: { title: string; description: string; items: Array<ConfigSyncPathSummary & { project: string }>; empty: string; icon: typeof InformationCircleIcon; repoURL?: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>
      <CardContent className="border-t pt-4">
        {items.length === 0 ? (
          <p className="flex items-center gap-2 text-xs text-muted-foreground"><HugeiconsIcon icon={icon} className="size-4" />{empty}</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={`${item.project}:${item.path}:${index}`} className="flex min-w-0 items-start justify-between gap-4 text-xs">
                <div className="min-w-0"><p className="truncate font-mono text-foreground" title={item.path}>{item.path}</p><p className="text-muted-foreground">{item.project} · {item.reason.replaceAll("_", " ")}</p></div>
                {item.bytes ? <span className="shrink-0 font-mono text-muted-foreground">{formatBytes(item.bytes)}</span> : null}
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 && repoURL ? <a className="mt-4 inline-flex text-xs font-medium text-primary hover:underline" href={repoURL} target="_blank" rel="noreferrer">Review preserved versions</a> : null}
      </CardContent>
    </Card>
  );
}

function flattenSummaries(projects: ConfigSyncMachineStatus[], key: "skipped" | "conflicts") {
  return projects.flatMap((project) => project[key].map((item) => ({ ...item, project: project.project_name })));
}

function newestSuccessful(projects: ConfigSyncMachineStatus[]): string | undefined {
  return projects.map((item) => item.last_successful_sync_at).filter((value): value is string => Boolean(value)).sort().at(-1);
}

export function ConfigurationError({ message }: { message: string }) {
  return <><PageHeader eyebrow="Workspace" title="Configuration" description="Portable agent settings synchronized across project machines." /><Alert variant="destructive"><HugeiconsIcon icon={Alert02Icon} /><AlertTitle>Configuration status is unavailable</AlertTitle><AlertDescription>{message}</AlertDescription></Alert></>;
}

export function ConfigurationLoading() {
  return <div aria-busy="true" aria-label="Loading configuration synchronization status"><PageHeader eyebrow="Workspace" title="Configuration" description="Portable agent settings synchronized across project machines." /><div className="mt-6 grid gap-4 lg:grid-cols-2"><Skeleton className="h-40" /><Skeleton className="h-40" /></div><Skeleton className="mt-6 h-64" /></div>;
}
