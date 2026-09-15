import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { fetchCustomers } from "@/lib/api";
import { formatCurrency } from "@/lib/customers";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/Card";
import { Stat } from "@/components/Stat";
import { CustomerTable } from "@/components/CustomerTable";

const customersQuery = queryOptions({
  queryKey: ["customers"],
  queryFn: fetchCustomers,
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(customersQuery),
  head: () => ({
    meta: [
      { title: "Customer Portfolio Dashboard — RetainAI" },
      {
        name: "description",
        content:
          "Monitor customer health, contract value, and renewal risk across your portfolio in one dashboard.",
      },
      { property: "og:title", content: "Customer Portfolio Dashboard — RetainAI" },
      {
        property: "og:description",
        content:
          "Monitor customer health, contract value, and renewal risk across your portfolio in one dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data: customers } = useSuspenseQuery(customersQuery);

  const totalAcv = customers.reduce((sum, c) => sum + c.acv, 0);
  const atRisk = customers.filter((c) => c.riskStatus !== "Low");
  const avgHealth = Math.round(
    customers.reduce((sum, c) => sum + c.healthScore, 0) / (customers.length || 1)
  );

  return (
    <PageShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Customer Portfolio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track health and renewal risk across your book of business.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Customers" value={customers.length} />
        <Stat label="Portfolio ACV" value={formatCurrency(totalAcv)} />
        <Stat
          label="At Risk"
          value={atRisk.length}
          hint={formatCurrency(atRisk.reduce((s, c) => s + c.acv, 0)) + " exposed"}
        />
        <Stat label="Avg Health Score" value={avgHealth} />
      </div>

      <Card title="All customers" description="Select a customer to investigate risk.">
        <CustomerTable customers={customers} />
      </Card>
    </PageShell>
  );
}
