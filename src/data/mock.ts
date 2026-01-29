export type Kpis = {
  projectedSavingsUsd: number;
  energyCostToDateKwh: number;
  successfullyActioned: number;
  unsuccessfullyActioned: number;
};

export type EnergyTypeSlice = {
  label: string;
  value: number; // percent or normalized share
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

export const energyByTypeForMonth: Record<string, EnergyTypeSlice[]> = {
  "Jan 2025": [
    { label: "Electricity", value: 6 },
    { label: "Chilled Water", value: 7 },
    { label: "Natural Gas", value: 8 },
    { label: "Steam", value: 9 },
  ],
  "Feb 2025": [
    { label: "Electricity", value: 36 },
    { label: "Chilled Water", value: 32 },
    { label: "Natural Gas", value: 18 },
    { label: "Steam", value: 14 },
  ],
  "Mar 2025": [
    { label: "Electricity", value: 44 },
    { label: "Chilled Water", value: 35 },
    { label: "Natural Gas", value: 17 },
    { label: "Steam", value: 4 },
  ],
  "Apr 2025": [
    { label: "Electricity", value: 22 },
    { label: "Chilled Water", value: 41 },
    { label: "Natural Gas", value: 17 },
    { label: "Steam", value: 10 },
  ],
  "May 2025": [
    { label: "Electricity", value: 1 },
    { label: "Chilled Water", value: 2 },
    { label: "Natural Gas", value: 3 },
    { label: "Steam", value: 4 },
  ]
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
  { name: "Zain RealMadrid", value: 13800 },
  { name: "Huda Juventus", value: 11200 },
  { name: "Maryam PSG", value: 8200 },
  { name: "Maram Barcelona ", value: 6600 },
  { name: "Max Liverpool", value: 15000 },
];

export const byAssignee: BarRow[] = [
  { name: "Unknown", value: 33000 },
  { name: "Jonathan Silva", value: 9000 },
  { name: "Julie Branson", value: 2000 },
  { name: "Tom DiChiara", value: 14000 },
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