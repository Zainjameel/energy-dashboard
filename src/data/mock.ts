export type Kpis = {
  projectedSavingsUsd: number;
  energyCostToDateKwh: number;
  successfullyActioned: number;
  unsuccessfullyActioned: number;
};

export type MonthlyInsight = {
  month: string; // e.g. "Feb 2025"
  success: number;
  unsuccess: number;
};

export type BarRow = { name: string; value: number };

export type InsightRow = {
  insightName: string;
  twin: string;
  projectedSavingsUsd: number;
  creator: string;
  assignee: string;
  dateClosed: string;
  lastActive: string;
};

export const kpis: Kpis = {
  projectedSavingsUsd: 33702,
  energyCostToDateKwh: 881_912,
  successfullyActioned: 131,
  unsuccessfullyActioned: 96,
};

export const monthly: MonthlyInsight[] = [
  { month: "Feb 2025", success: 0, unsuccess: 0 },
  { month: "Mar 2025", success: 2, unsuccess: 1 },
  { month: "Apr 2025", success: 0, unsuccess: 0 },
  { month: "May 2025", success: 3, unsuccess: 0 },
  { month: "Jun 2025", success: 4, unsuccess: 0 },
  { month: "Jul 2025", success: 12, unsuccess: 3 },
  { month: "Aug 2025", success: 20, unsuccess: 2 },
  { month: "Sep 2025", success: 60, unsuccess: 8 },
  { month: "Oct 2025", success: 22, unsuccess: 18 },
  { month: "Nov 2025", success: 14, unsuccess: 26 },
  { month: "Dec 2025", success: 16, unsuccess: 46 },
  { month: "Jan 2026", success: 2, unsuccess: 30 },
];

export const byCreator: BarRow[] = [
  { name: "Zain RealMadrid", value: 14800 },
  { name: "Huda Arsenal", value: 12200 },
  { name: "Maryam PSG", value: 8200 },
  { name: "Maram Barcelona ", value: 1600 },
  { name: "Max Liverpool", value: 500 },
];

export const byAssignee: BarRow[] = [
  { name: "Unknown", value: 33000 },
  { name: "Jonathan Silva", value: 900 },
  { name: "Julie Branson", value: 200 },
  { name: "Tom DiChiara", value: 140 },
];

export const topInsights: InsightRow[] = [
  {
    insightName: "AHU Discharge Air Temperature Below Setpoint (Cooling)",
    twin: "Air Handling Unit 0100",
    projectedSavingsUsd: 647,
    creator: "Zain RealMadrid",
    assignee: "",
    dateClosed: "2025-09-24 00:36",
    lastActive: "2025-11-19 15:59",
  },
  {
    insightName: "AHU Return Air Temperature Lower Than Expected During Cooling Mode",
    twin: "AHU_2",
    projectedSavingsUsd: 4134,
    creator: "Max Liverpool",
    assignee: "",
    dateClosed: "2025-12-03",
    lastActive: "2025-11-19 15:59",
  },
  {
    insightName: "Terminal Unit Leaking Reheat Coil Valve",
    twin: "13013.VAVB.1158",
    projectedSavingsUsd: 651,
    creator: "Maryam PSG",
    assignee: "",
    dateClosed: "2026-01-07",
    lastActive: "2025-09-12 11:58",
  },
  {
    insightName: "AHU Static Pressure Above Setpoint",
    twin: "AHU_2",
    projectedSavingsUsd: 91.58,
    creator: "Maram Barcelona",
    assignee: "",
    dateClosed: "2026-01-16",
    lastActive: "2025-11-03 05:59",
  },
];