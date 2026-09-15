import type { Customer, RiskAssessment, RiskDriver } from "@/types";
import { customers, getCustomer as getMockCustomer } from "@/lib/customers";

/**
 * RetAIn.ai API service.
 *
 * Talks to the FastAPI backend at VITE_API_URL:
 *   GET  {base}/customers
 *   GET  {base}/customers/{id}
 *   POST {base}/customers/{id}/investigate
 *
 * When VITE_API_URL is unset or the backend is unreachable, every method
 * falls back to bundled mock data so the app keeps working standalone.
 */

const API_URL = import.meta.env["VITE_API_URL"] as string | undefined;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new Error("VITE_API_URL is not configured");
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// --- Mock fallbacks -------------------------------------------------------

function mockCustomers(): Customer[] {
  return customers;
}

function mockCustomer(id: string): Customer {
  const customer = getMockCustomer(id);
  if (!customer) throw new Error(`Customer not found: ${id}`);
  return customer;
}

function mockInvestigation(customer: Customer): RiskAssessment {
  const drivers: RiskDriver[] = [];
  if (customer.signals.usageTrend < -15)
    drivers.push({ id: "usage", label: "Product usage declining", severity: "high" });
  else if (customer.signals.usageTrend < 0)
    drivers.push({ id: "usage", label: "Product usage softening", severity: "medium" });
  if (customer.signals.criticalTickets > 0)
    drivers.push({ id: "tickets", label: "Open critical support tickets", severity: "high" });
  if (customer.daysToRenewal <= 90)
    drivers.push({ id: "renewal", label: "Upcoming renewal", severity: "medium" });
  if (customer.signals.sentimentScore < 45)
    drivers.push({ id: "sentiment", label: "Negative customer sentiment", severity: "medium" });
  if (drivers.length === 0)
    drivers.push({ id: "none", label: "No significant risk drivers detected", severity: "low" });

  const riskScore = Math.min(
    98,
    Math.max(
      5,
      Math.round(
        100 -
          customer.healthScore * 0.6 -
          customer.signals.sentimentScore * 0.2 +
          (customer.daysToRenewal <= 90 ? 12 : 0) +
          customer.signals.criticalTickets * 5
      )
    )
  );
  const riskLevel: RiskAssessment["riskLevel"] =
    riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";

  return { riskScore, riskLevel, riskDrivers: drivers };
}

// --- Public API -----------------------------------------------------------

export async function getCustomers(): Promise<Customer[]> {
  try {
    return await request<Customer[]>("/customers");
  } catch {
    await delay(150);
    return mockCustomers();
  }
}

export async function getCustomer(id: string): Promise<Customer> {
  try {
    return await request<Customer>(`/customers/${id}`);
  } catch (err) {
    if (API_URL && err instanceof Error && !err.message.startsWith("API request failed: 404")) {
      await delay(150);
      return mockCustomer(id);
    }
    throw err;
  }
}

export async function investigateCustomer(id: string): Promise<RiskAssessment> {
  try {
    return await request<RiskAssessment>(`/customers/${id}/investigate`, { method: "POST" });
  } catch {
    await delay(1800);
    return mockInvestigation(mockCustomer(id));
  }
}
