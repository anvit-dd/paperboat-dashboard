"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logs, logLevels, type LogLevel } from "@/lib/dashboard-data";

const LEVEL_COLOR: Record<LogLevel, string> = {
  INFO: "text-sky-500",
  WARN: "text-amber-500",
  ERROR: "text-destructive",
  DEBUG: "text-muted-foreground",
};

export function LogViewer() {
  const [active, setActive] = React.useState<Set<LogLevel>>(new Set(logLevels));
  const [query, setQuery] = React.useState("");
  const [live, setLive] = React.useState(true);

  function toggle(level: LogLevel) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  }

  const visible = logs.filter(
    (l) =>
      active.has(l.level) &&
      (query === "" ||
        `${l.agent} ${l.message}`.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        <div className="relative flex-1 min-w-48">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <HugeiconsIcon icon={Search01Icon} className="size-3.5" />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter log lines…"
            className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </div>
        <div className="flex items-center gap-1">
          {logLevels.map((level) => (
            <button
              key={level}
              onClick={() => toggle(level)}
              className={cn(
                "rounded-md border px-2 py-1 font-mono text-[0.6875rem] font-medium transition-colors",
                active.has(level)
                  ? "border-border bg-muted text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-muted/50",
              )}
            >
              {level}
            </button>
          ))}
        </div>
        <Button
          variant={live ? "default" : "outline"}
          size="sm"
          onClick={() => setLive((v) => !v)}
        >
          <HugeiconsIcon icon={live ? PauseIcon : PlayIcon} />
          {live ? "Live" : "Paused"}
        </Button>
      </div>

      <div className="max-h-[28rem] overflow-auto bg-muted/30 p-3 font-mono text-xs leading-relaxed">
        {visible.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No matching log lines.</p>
        ) : (
          visible.map((l, i) => (
            <div
              key={i}
              className="flex gap-3 rounded px-2 py-1 hover:bg-foreground/[0.04]"
            >
              <span className="shrink-0 text-muted-foreground tabular-nums">{l.ts}</span>
              <span className={cn("w-12 shrink-0 font-medium", LEVEL_COLOR[l.level])}>
                {l.level}
              </span>
              <span className="shrink-0 text-primary">{l.agent}</span>
              <span className="text-foreground/90">{l.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
