import { cn } from "@/lib/utils";

function barColor(score: number): string {
  if (score >= 70) return "bg-success";
  if (score >= 45) return "bg-warning";
  return "bg-destructive";
}

export function HealthScore({ score, className }: { score: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="w-8 text-sm font-medium tabular-nums text-foreground">{score}</span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", barColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
