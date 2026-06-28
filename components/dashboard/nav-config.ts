import {
  DashboardSquare01Icon,
  AiCloud01Icon,
  Robot01Icon,
  CloudServerIcon,
  TrainFrontTunnel,
  Rocket01Icon,
  TerminalIcon,
  HardDriveIcon,
  Analytics01Icon,
  Key01Icon,
  UserGroupIcon,
  CreditCardIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export type NavItem = {
  title: string;
  href: string;
  icon: IconSvgElement;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { title: "Overview", href: "/dashboard", icon: DashboardSquare01Icon },
      { title: "Cloud Agents", href: "/dashboard/agents", icon: AiCloud01Icon, badge: "12" },
      { title: "Remote Agents", href: "/dashboard/remote-agents", icon: Robot01Icon },
      { title: "Hosted Hermes", href: "/dashboard/hermes", icon: CloudServerIcon },
      { title: "AgenTunnel", href: "/dashboard/tunnels", icon: TrainFrontTunnel },
    ],
  },
  {
    label: "Observability",
    items: [
      { title: "Deployments", href: "/dashboard/deployments", icon: Rocket01Icon },
      { title: "Logs", href: "/dashboard/logs", icon: TerminalIcon },
      { title: "Storage", href: "/dashboard/storage", icon: HardDriveIcon },
      { title: "Usage", href: "/dashboard/usage", icon: Analytics01Icon },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "API Keys", href: "/dashboard/api-keys", icon: Key01Icon },
      { title: "Team", href: "/dashboard/team", icon: UserGroupIcon },
      { title: "Billing", href: "/dashboard/billing", icon: CreditCardIcon },
      { title: "Settings", href: "/dashboard/settings", icon: Settings01Icon },
    ],
  },
];

/** Flat lookup of href -> title, used for breadcrumbs. */
export const navTitleByHref: Record<string, string> = Object.fromEntries(
  navGroups.flatMap((g) => g.items.map((i) => [i.href, i.title])),
);
