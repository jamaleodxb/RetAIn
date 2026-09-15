import type { Customer } from "@/types";

export const customers: Customer[] = [
  {
    id: "northstar-logistics",
    name: "Northstar Logistics",
    segment: "Enterprise",
    acv: 240000,
    daysToRenewal: 43,
    healthScore: 41,
    riskStatus: "High",
    signals: { usageTrend: -28, openTickets: 9, criticalTickets: 3, sentimentScore: 34 },
  },
  {
    id: "atlas-manufacturing",
    name: "Atlas Manufacturing",
    segment: "Mid-Market",
    acv: 120000,
    daysToRenewal: 180,
    healthScore: 82,
    riskStatus: "Low",
    signals: { usageTrend: 12, openTickets: 1, criticalTickets: 0, sentimentScore: 78 },
  },
  {
    id: "horizon-retail",
    name: "Horizon Retail",
    segment: "Enterprise",
    acv: 310000,
    daysToRenewal: 65,
    healthScore: 58,
    riskStatus: "Medium",
    signals: { usageTrend: -9, openTickets: 4, criticalTickets: 1, sentimentScore: 55 },
  },
];

export function getCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
