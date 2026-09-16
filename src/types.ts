export type RiskLevel = "Low" | "Medium" | "High";

export interface RiskSignals {
  /** % change vs prior period, negative = declining */
  usageTrend: number;
  openTickets: number;
  criticalTickets: number;
  /** 0–100 */
  sentimentScore: number;
}

export interface Customer {
  id: string;
  name: string;
  segment: "Enterprise" | "Mid-Market" | "SMB";
  acv: number;
  daysToRenewal: number;
  healthScore: number;
  riskStatus: RiskLevel;
  signals: RiskSignals;
}

export interface RiskDriver {
  id: string;
  label: string;
  severity: "low" | "medium" | "high";
}

export interface RiskAssessment {
  riskScore: number;

  riskLevel: RiskLevel;

  riskDrivers: RiskDriver[];

  recommendedPlaybook: string;

  recommendedActions: string[];

  outreachSubject: string;

  outreachBody: string;

  timeline: string[];
}
