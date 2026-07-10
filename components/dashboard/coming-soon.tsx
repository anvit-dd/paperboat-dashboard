import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";

/**
 * Consistent placeholder for dashboard surfaces that paperboat-server does not
 * back yet. Shows honest "not available" copy instead of fabricated data.
 */
export function ComingSoon({
  icon,
  title,
  description,
}: {
  icon: IconSvgElement;
  title: string;
  description: string;
}) {
  return (
    <Empty className="min-h-[22rem] border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={icon} />
        </EmptyMedia>
        <EmptyTitle className="font-heading">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Badge variant="outline">Coming soon</Badge>
      </EmptyContent>
    </Empty>
  );
}
