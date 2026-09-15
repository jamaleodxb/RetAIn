import type { RiskLevel } from "@/lib/customers";
import { cn } from "@/lib/utils";

const styles: Record<RiskLevel, string> = {
  High: "bg-destructive/10 text-destructive ring-destructive/20",
  Medium: "bg-warning/20 text-warning-foreground ring-warning/30",
  Low: "bg-success/10 text-success ring-success/20",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[level],
        className
      )}
    >
      {level} Risk
    </span>
  );
}
