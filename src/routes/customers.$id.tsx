import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, Loader2, TrendingDown, TrendingUp, TriangleAlert } from "lucide-react";
import { fetchCustomer, investigateCustomer } from "@/lib/api";
import { formatCurrency, type Customer } from "@/lib/customers";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/Card";
import { Stat } from "@/components/Stat";
import { RiskBadge } from "@/components/RiskBadge";
import { HealthScore } from "@/components/HealthScore";

const customerQuery = (id: string) =>
  queryOptions({
    queryKey: ["customers", id],
    queryFn: async () => {
      try {
        return await fetchCustomer(id);
      } catch {
        throw notFound();
      }
    },
  });

export const Route = createFileRoute("/customers/$id")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(customerQuery(params.id)),
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Customer";
    return {
      meta: [
        { title: `${name} — Risk Investigation — RetainAI` },
        {
          name: "description",
          content: `Investigate churn risk signals for ${name} with RetainAI.`,
        },
        { property: "og:title", content: `${name} — Risk Investigation — RetainAI` },
        {
          property: "og:description",
          content: `Investigate churn risk signals for ${name} with RetainAI.`,
        },
      ],
    };
  },
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = Route.useParams();
  const { data: customer } = useSuspenseQuery(customerQuery(id));

  const investigate = useMutation({
    mutationFn: () => investigateCustomer(customer.id),
  });

  return (
    <PageShell>
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to portfolio
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {customer.name}
        </h1>
        <RiskBadge level={customer.riskStatus} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OverviewCard customer={customer} />
        <SignalsCard customer={customer} />
      </div>

      <div className="mt-6">
        <button
          onClick={() => investigate.mutate()}
          disabled={investigate.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {investigate.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {investigate.isPending ? "Investigating risk…" : "Investigate Risk"}
        </button>
        {investigate.isPending && (
          <p className="mt-2 text-sm text-muted-foreground">
            Analyzing usage, support, and sentiment signals. This may take a few seconds.
          </p>
        )}
        {investigate.isError && (
          <p className="mt-2 text-sm text-destructive">
            Investigation failed. Please try again.
          </p>
        )}
      </div>

      {investigate.data && (
        <Card
          className="mt-6"
          title="Risk Assessment"
          description={`Generated for ${customer.name}`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Stat label="Risk Score" value={investigate.data.riskScore} hint="out of 100" />
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Risk Level
              </p>
              <div className="mt-1.5">
                <RiskBadge level={investigate.data.riskLevel} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Risk Drivers
            </p>
            <ul className="mt-2 space-y-2">
              {investigate.data.riskDrivers.map((driver) => (
                <li
                  key={driver}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  {driver}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </PageShell>
  );
}

function OverviewCard({ customer }: { customer: Customer }) {
  return (
    <Card title="Customer Overview" description="Account and contract details">
      <dl className="space-y-3 text-sm">
        <Row label="Customer" value={customer.name} />
        <Row label="Segment" value={customer.segment} />
        <Row label="Annual Contract Value" value={formatCurrency(customer.acv)} />
        <Row label="Days To Renewal" value={`${customer.daysToRenewal} days`} />
        <div className="flex items-center justify-between border-t border-border pt-3">
          <dt className="text-muted-foreground">Health Score</dt>
          <dd>
            <HealthScore score={customer.healthScore} />
          </dd>
        </div>
      </dl>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums text-foreground">{value}</dd>
    </div>
  );
}

function SignalsCard({ customer }: { customer: Customer }) {
  const { usageTrend, openTickets, criticalTickets, sentimentScore } = customer.signals;
  const declining = usageTrend < 0;
  const TrendIcon = declining ? TrendingDown : TrendingUp;

  return (
    <Card title="Risk Signals" description="Latest product, support, and sentiment signals">
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat
          label="Usage Trend"
          value={
            <span className="inline-flex items-center gap-1.5">
              <TrendIcon
                className={declining ? "h-4 w-4 text-destructive" : "h-4 w-4 text-success"}
              />
              {usageTrend > 0 ? "+" : ""}
              {usageTrend}%
            </span>
          }
          hint="vs. previous 30 days"
        />
        <Stat label="Open Support Tickets" value={openTickets} />
        <Stat
          label="Critical Tickets"
          value={criticalTickets}
          hint={criticalTickets > 0 ? "Requires attention" : "None open"}
        />
        <Stat label="Sentiment Score" value={sentimentScore} hint="out of 100" />
      </div>
    </Card>
  );
}
