import type { Status } from "@/components/dashboard/status-badge";

export const runsSeries = [
  { day: "Mon", runs: 1840, completed: 1720 },
  { day: "Tue", runs: 2210, completed: 2090 },
  { day: "Wed", runs: 1990, completed: 1880 },
  { day: "Thu", runs: 2640, completed: 2510 },
  { day: "Fri", runs: 3120, completed: 2980 },
  { day: "Sat", runs: 2470, completed: 2360 },
  { day: "Sun", runs: 2890, completed: 2770 },
];

export const computeSeries = [
  { hour: "00:00", cpu: 42, memory: 51 },
  { hour: "04:00", cpu: 38, memory: 48 },
  { hour: "08:00", cpu: 61, memory: 64 },
  { hour: "12:00", cpu: 78, memory: 72 },
  { hour: "16:00", cpu: 84, memory: 80 },
  { hour: "20:00", cpu: 66, memory: 69 },
];

export const regionSeries = [
  { region: "us-east", agents: 38 },
  { region: "us-west", agents: 24 },
  { region: "eu-central", agents: 31 },
  { region: "ap-south", agents: 17 },
  { region: "sa-east", agents: 9 },
];

export type Agent = {
  id: string;
  name: string;
  model: string;
  region: string;
  status: Status;
  runs: number;
  uptime: string;
  updated: string;
};

export const agents: Agent[] = [
  { id: "agt_8f2a", name: "support-triage", model: "Claude Opus 4.8", region: "us-east", status: "running", runs: 12840, uptime: "99.98%", updated: "2m ago" },
  { id: "agt_4c91", name: "code-reviewer", model: "Claude Sonnet 4.6", region: "eu-central", status: "running", runs: 9120, uptime: "99.95%", updated: "11m ago" },
  { id: "agt_2b77", name: "data-pipeline", model: "Claude Opus 4.8", region: "us-west", status: "deploying", runs: 4310, uptime: "99.81%", updated: "just now" },
  { id: "agt_7d10", name: "doc-summarizer", model: "Claude Haiku 4.5", region: "ap-south", status: "running", runs: 22190, uptime: "100%", updated: "1h ago" },
  { id: "agt_9a03", name: "sales-research", model: "Claude Sonnet 4.6", region: "us-east", status: "paused", runs: 1870, uptime: "98.40%", updated: "3h ago" },
  { id: "agt_1e58", name: "incident-bot", model: "Claude Opus 4.8", region: "eu-central", status: "failed", runs: 540, uptime: "94.10%", updated: "6h ago" },
];

export type Deployment = {
  id: string;
  agent: string;
  version: string;
  status: Status;
  author: string;
  duration: string;
  when: string;
};

export const deployments: Deployment[] = [
  { id: "dpl_001", agent: "support-triage", version: "v1.42.0", status: "active", author: "anvit", duration: "1m 12s", when: "2m ago" },
  { id: "dpl_002", agent: "data-pipeline", version: "v0.9.3", status: "deploying", author: "maya", duration: "—", when: "just now" },
  { id: "dpl_003", agent: "code-reviewer", version: "v3.11.1", status: "active", author: "leo", duration: "48s", when: "26m ago" },
  { id: "dpl_004", agent: "incident-bot", version: "v2.0.0", status: "failed", author: "anvit", duration: "2m 04s", when: "6h ago" },
  { id: "dpl_005", agent: "doc-summarizer", version: "v1.8.7", status: "active", author: "priya", duration: "55s", when: "1d ago" },
];

export type Tunnel = {
  id: string;
  name: string;
  endpoint: string;
  target: string;
  status: Status;
  requests: string;
  latency: string;
};

export const tunnels: Tunnel[] = [
  { id: "tun_a1", name: "prod-ingress", endpoint: "prod.agentunnel.dev", target: "support-triage:8080", status: "healthy", requests: "1.2M", latency: "38ms" },
  { id: "tun_b2", name: "staging-ingress", endpoint: "stg.agentunnel.dev", target: "data-pipeline:8080", status: "healthy", requests: "210K", latency: "44ms" },
  { id: "tun_c3", name: "webhook-relay", endpoint: "hooks.agentunnel.dev", target: "incident-bot:9000", status: "degraded", requests: "88K", latency: "120ms" },
  { id: "tun_d4", name: "dev-preview", endpoint: "dev.agentunnel.dev", target: "code-reviewer:8080", status: "paused", requests: "4.1K", latency: "—" },
];

export type Volume = {
  id: string;
  name: string;
  region: string;
  used: number;
  size: number;
  status: Status;
};

export const volumes: Volume[] = [
  { id: "vol_01", name: "agent-state-prod", region: "us-east", used: 412, size: 512, status: "healthy" },
  { id: "vol_02", name: "vector-index", region: "eu-central", used: 188, size: 256, status: "healthy" },
  { id: "vol_03", name: "run-artifacts", region: "us-west", used: 96, size: 128, status: "healthy" },
  { id: "vol_04", name: "cold-archive", region: "ap-south", used: 740, size: 1024, status: "degraded" },
];

export const logLevels = ["INFO", "WARN", "ERROR", "DEBUG"] as const;
export type LogLevel = (typeof logLevels)[number];

export type LogLine = {
  ts: string;
  level: LogLevel;
  agent: string;
  message: string;
};

export const logs: LogLine[] = [
  { ts: "12:04:51.220", level: "INFO", agent: "support-triage", message: "run agt_8f2a/r_91k started — model=claude-opus-4-8" },
  { ts: "12:04:51.884", level: "INFO", agent: "support-triage", message: "tool_call resolve_ticket(id=4821) → ok in 312ms" },
  { ts: "12:04:52.010", level: "DEBUG", agent: "data-pipeline", message: "checkpoint flushed to vol_01 (412MB)" },
  { ts: "12:04:52.661", level: "WARN", agent: "incident-bot", message: "retry 2/3 on upstream pagerduty (429)" },
  { ts: "12:04:53.117", level: "ERROR", agent: "incident-bot", message: "deploy dpl_004 failed: image pull backoff" },
  { ts: "12:04:53.540", level: "INFO", agent: "code-reviewer", message: "PR #2291 reviewed — 3 suggestions, 0 blocking" },
  { ts: "12:04:54.002", level: "INFO", agent: "doc-summarizer", message: "batch of 48 documents summarized in 6.2s" },
  { ts: "12:04:54.730", level: "DEBUG", agent: "support-triage", message: "tunnel prod-ingress p50=38ms p99=104ms" },
  { ts: "12:04:55.219", level: "INFO", agent: "sales-research", message: "agent paused by schedule (off-hours)" },
];

export type Member = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Developer" | "Viewer";
  status: Status;
  lastActive: string;
};

export const members: Member[] = [
  { id: "u1", name: "Anvit Dadape", email: "dinesh.dadape@gmail.com", role: "Owner", status: "active", lastActive: "now" },
  { id: "u2", name: "Maya Chen", email: "maya@paperboat.dev", role: "Admin", status: "active", lastActive: "12m ago" },
  { id: "u3", name: "Leo Martins", email: "leo@paperboat.dev", role: "Developer", status: "active", lastActive: "1h ago" },
  { id: "u4", name: "Priya Nair", email: "priya@paperboat.dev", role: "Developer", status: "active", lastActive: "3h ago" },
  { id: "u5", name: "Sam Okoro", email: "sam@paperboat.dev", role: "Viewer", status: "paused", lastActive: "2d ago" },
];

export type ApiKey = {
  id: string;
  name: string;
  prefix: string;
  scope: string;
  created: string;
  lastUsed: string;
};

export const apiKeys: ApiKey[] = [
  { id: "k1", name: "Production server", prefix: "pk_live_8Fa2…9c1", scope: "read · write", created: "Mar 2, 2026", lastUsed: "2m ago" },
  { id: "k2", name: "CI / GitHub Actions", prefix: "pk_live_3bD7…a40", scope: "deploy", created: "Feb 18, 2026", lastUsed: "1h ago" },
  { id: "k3", name: "Local development", prefix: "pk_test_91Kz…7e2", scope: "read", created: "Jan 9, 2026", lastUsed: "5d ago" },
];

export type Invoice = {
  id: string;
  period: string;
  amount: string;
  status: "Paid" | "Due" | "Refunded";
};

export const invoices: Invoice[] = [
  { id: "in_2026_06", period: "Jun 2026", amount: "$482.10", status: "Due" },
  { id: "in_2026_05", period: "May 2026", amount: "$451.88", status: "Paid" },
  { id: "in_2026_04", period: "Apr 2026", amount: "$398.40", status: "Paid" },
  { id: "in_2026_03", period: "Mar 2026", amount: "$372.05", status: "Paid" },
];
