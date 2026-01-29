export interface TariffData {
  reciprocal: number;
  fentanyl: number;
  section301: string;
  section232: number;
  effectiveTotal: string;
  lastUpdated: Date;
  sources: string[];
}

export interface HTSCode {
  code: string;
  description: string;
  reciprocal: number;
  fentanyl: number;
  section301: number;
  total: number;
}

export interface ScenarioData {
  id: string;
  name: string;
  probability: number;
  description: string;
  priceImpact: string;
  volumeImpact: string;
  jobsImpact: string;
}

export interface CompanyImpact {
  revenue: number;
  exportPct: number;
  chinaPct: number;
  headcount: number;
  revenueAtRisk: number;
  jobsAtRisk: number;
  expectedRevenue: number;
  expectedJobs: number;
}
