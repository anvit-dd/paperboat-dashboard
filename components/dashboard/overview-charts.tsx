"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { runsSeries, regionSeries, computeSeries } from "@/lib/dashboard-data";

const computeConfig = {
  cpu: { label: "CPU %", color: "var(--chart-4)" },
  memory: { label: "Memory %", color: "var(--chart-2)" },
} satisfies ChartConfig;

const runsConfig = {
  runs: { label: "Runs", color: "var(--chart-2)" },
  completed: { label: "Completed", color: "var(--chart-4)" },
} satisfies ChartConfig;

const regionConfig = {
  agents: { label: "Agents", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function RunsChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">
          Agent runs
        </CardTitle>
        <CardDescription>Invocations across all agents, last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={runsConfig} className="aspect-auto h-64 w-full">
          <AreaChart data={runsSeries} margin={{ left: 4, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="fillRuns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-runs)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-runs)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="runs"
              type="monotone"
              stroke="var(--color-runs)"
              fill="url(#fillRuns)"
              strokeWidth={2}
            />
            <Area
              dataKey="completed"
              type="monotone"
              stroke="var(--color-completed)"
              fill="url(#fillCompleted)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function RegionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">
          Agents by region
        </CardTitle>
        <CardDescription>Active distribution across edges</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={regionConfig} className="aspect-auto h-64 w-full">
          <BarChart data={regionSeries} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              dataKey="region"
              type="category"
              tickLine={false}
              axisLine={false}
              width={72}
              tickMargin={4}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="agents" fill="var(--color-agents)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ComputeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-base font-semibold">
          Compute utilization
        </CardTitle>
        <CardDescription>CPU and memory across the fleet, last 24h</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={computeConfig} className="aspect-auto h-72 w-full">
          <AreaChart data={computeSeries} margin={{ left: 4, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="fillCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cpu)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-cpu)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillMem" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-memory)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-memory)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={32} domain={[0, 100]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area dataKey="cpu" type="monotone" stroke="var(--color-cpu)" fill="url(#fillCpu)" strokeWidth={2} />
            <Area dataKey="memory" type="monotone" stroke="var(--color-memory)" fill="url(#fillMem)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
