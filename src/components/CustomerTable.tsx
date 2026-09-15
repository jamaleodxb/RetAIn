import { useNavigate } from "@tanstack/react-router";
import type { Customer } from "@/lib/customers";
import { formatCurrency } from "@/lib/customers";
import { HealthScore } from "./HealthScore";
import { RiskBadge } from "./RiskBadge";

export function CustomerTable({ customers }: { customers: Customer[] }) {
  const navigate = useNavigate();

  const open = (id: string) => navigate({ to: "/customers/$id", params: { id } });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {[
              "Customer",
              "Segment",
              "Annual Contract Value",
              "Days To Renewal",
              "Health Score",
              "Risk Status",
            ].map((h) => (
              <th
                key={h}
                className="px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              tabIndex={0}
              role="link"
              onClick={() => open(c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(c.id);
                }
              }}
              className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-accent/40 focus:bg-accent/40 focus:outline-none"
            >
              <td className="px-3 py-3.5 font-medium text-foreground">{c.name}</td>
              <td className="px-3 py-3.5 text-muted-foreground">{c.segment}</td>
              <td className="px-3 py-3.5 tabular-nums text-foreground">
                {formatCurrency(c.acv)}
              </td>
              <td className="px-3 py-3.5 tabular-nums text-muted-foreground">
                {c.daysToRenewal} days
              </td>
              <td className="px-3 py-3.5">
                <HealthScore score={c.healthScore} />
              </td>
              <td className="px-3 py-3.5">
                <RiskBadge level={c.riskStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
