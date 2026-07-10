import {
  BoatIcon,
  Folder01Icon,
  Configuration01Icon,
  TrainFrontTunnel,
  CloudServerIcon,
  AiLockIcon,
  TerminalIcon,
  Analytics01Icon,
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
    label: "Workspace",
    items: [
      { title: "Boats", href: "/dashboard/boats", icon: BoatIcon },
      { title: "Projects", href: "/dashboard/projects", icon: Folder01Icon },
      { title: "Configuration", href: "/dashboard/configuration", icon: Configuration01Icon },
    ],
  },
  {
    label: "Platform",
    items: [
      { title: "AgenTunnel", href: "/dashboard/tunnels", icon: TrainFrontTunnel },
      { title: "Hermes", href: "/dashboard/hermes", icon: CloudServerIcon },
      { title: "Secrets", href: "/dashboard/secrets", icon: AiLockIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Logs", href: "/dashboard/logs", icon: TerminalIcon },
      { title: "Teams", href: "/dashboard/team", icon: UserGroupIcon },
      { title: "Usage", href: "/dashboard/usage", icon: Analytics01Icon },
      { title: "Billing", href: "/dashboard/billing", icon: CreditCardIcon },
      { title: "Settings", href: "/dashboard/settings", icon: Settings01Icon },
    ],
  },
];

/** Flat lookup of href -> title, used for breadcrumbs. */
export const navTitleByHref: Record<string, string> = Object.fromEntries(
  navGroups.flatMap((g) => g.items.map((i) => [i.href, i.title])),
);
