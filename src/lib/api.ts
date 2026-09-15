import type { Customer, RiskAssessment } from "./customers";
import { customers, getCustomer } from "./customers";

/**
 * API layer for RetainAI.
 *
 * Today it serves mock data. To consume a real FastAPI backend, set
 * VITE_API_BASE_URL (e.g. "https://api.retainai.example.com") and the
 * functions below will call it instead, with the same shapes:
 *
 *   GET  {base}/customers
 *   GET  {base}/customers/{id}
 *   POST {base}/customers/{id}/investigate
 */

const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] as string | undefined;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchCustomers(): Promise<Customer[]> {
  if (API_BASE_URL) return request<Customer[]>("/customers");
  await delay(150);
  return customers;
}

export async function fetchCustomer(id: string): Promise<Customer> {
  if (API_BASE_URL) return request<Customer>(`/customers/${id}`);
  await delay(150);
  const customer = getCustomer(id);
  if (!customer) throw new Error(`Customer not found: ${id}`);
  return customer;
}

export async function investigateCustomer(id: string): Promise<RiskAssessment> {
  if (API_BASE_URL) {
    return request<RiskAssessment>(`/customers/${id}/investigate`, {
      method: "POST",
    });
  }
  // Mock investigation: simulate processing time, then derive a plausible
  // assessment from the customer's signals.
  await delay(1800);
  const customer = getCustomer(id);
  if (!customer) throw new Error(`Customer not found: ${id}`);

  const drivers: string[] = [];
  if (customer.signals.usageTrend < -15) drivers.push("Product usage declining");
  else if (customer.signals.usageTrend < 0) drivers.push("Product usage softening");
  if (customer.signals.criticalTickets > 0) drivers.push("Open critical support tickets");
  if (customer.daysToRenewal <= 90) drivers.push("Upcoming renewal");
  if (customer.signals.sentimentScore < 45) drivers.push("Negative customer sentiment");
  if (drivers.length === 0) drivers.push("No significant risk drivers detected");

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
