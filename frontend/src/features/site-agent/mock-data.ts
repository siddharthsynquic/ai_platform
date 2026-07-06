export type ObsStatus = "open" | "resolved";
export type ObsSource = "site-report" | "query" | "update";

export interface Reply {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  transcribedText?: string;
  attachments?: { type: "image" | "audio" | "file"; name: string; path: string }[];
}

export interface Observation {
  id: string;
  serialNo: number;
  _source: ObsSource;
  type?: "query" | "update";
  source?: "manual" | "pptx";
  status: ObsStatus;
  description: string;
  category: string;
  location?: string;
  dateRaised: string;
  createdAt?: string;
  projectType?: string;
  projectName?: string;
  stage?: string;
  responsibleStakeholder?: string;
  natureOfObservation?: string;
  technicalRootCause?: string;
  raisedBy?: string;
  sourceFile?: string;
  solutionDescription?: string;
  solutionMode?: string;
  suggestedResolution?: string;
  resolutionDescription?: string;
  resolvedDate?: string;
  images?: { before?: string[]; after?: string[] };
  replies?: Reply[];
  resolutionAttachments?: { type: "image" | "file"; name: string; path: string }[];
}

export interface Project {
  id: string;
  name: string;
  totalQueries: number;
  openQueries: number;
}

export interface CategoryStat {
  total: number;
  open: number;
  resolved: number;
}

export interface DashboardStats {
  siteReports: { total: number; resolved: number; open: number };
  queries: { total: number; open: number; resolved: number };
  updates: { total: number };
  projects: Project[];
  categoryBreakdown: Record<string, CategoryStat>;
  recentManual: Observation[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface ReportItem {
  imagePaths?: string[];
  audioPath?: string | null;
  text?: string;
  transcribedText?: string;
  images?: { before?: string[]; after?: string[] };
  description?: string;
  category?: string;
}

export interface GeneratedReport {
  id: string;
  projectName: string;
  date: string;
  createdAt: string;
  itemCount: number;
  items: ReportItem[];
  htmlPath?: string;
  status?: "queued" | "generating" | "done" | "error";
  error?: string;
}

const PLACEHOLDER = (color: string, label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='50%' font-family='Inter,sans-serif' font-size='22' fill='white' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
  )}`;

export const MOCK_IMG = {
  waterproof: PLACEHOLDER("#0369a1", "Waterproofing"),
  rebar: PLACEHOLDER("#b45309", "Rebar"),
  facade: PLACEHOLDER("#0f766e", "Facade"),
  mep: PLACEHOLDER("#7c3aed", "MEP"),
  stair: PLACEHOLDER("#dc2626", "Staircase"),
  finishing: PLACEHOLDER("#65a30d", "Finishing"),
  flooring: PLACEHOLDER("#c026d3", "Flooring"),
  electrical: PLACEHOLDER("#0891b2", "Electrical"),
};

export const CATEGORIES = [
  "General",
  "Finishes",
  "Structural",
  "MEP",
  "Plumbing",
  "Electrical",
  "Fire Safety",
  "Facade",
  "Flooring",
  "Painting",
  "Waterproofing",
  "Landscaping",
  "HVAC",
  "Elevator",
  "Other",
];

export const PROJECT_TYPES = [
  "Hospital",
  "Residential",
  "Commercial",
  "Educational",
  "Hospitality",
  "Retail",
  "Mixed-Use",
  "Industrial",
];

export const MOCK_PROJECTS: Project[] = [
  { id: "p1", name: "Tower A — Marina Bay", totalQueries: 34, openQueries: 9 },
  { id: "p2", name: "Mall Block C", totalQueries: 21, openQueries: 4 },
  { id: "p3", name: "Residences Phase 2", totalQueries: 18, openQueries: 6 },
  { id: "p4", name: "Office Tower East", totalQueries: 27, openQueries: 11 },
];

export const MOCK_OBSERVATIONS: Observation[] = [
  {
    id: "o1",
    serialNo: 1,
    _source: "query",
    type: "query",
    source: "manual",
    status: "open",
    description: "Waterproofing breach on parapet — visible seepage into Floor 12 slab.",
    category: "Waterproofing",
    location: "Tower A · Floor 12 · Zone A",
    dateRaised: "2026-07-04",
    createdAt: "2026-07-04T09:12:00Z",
    projectType: "Commercial",
    projectName: "Tower A — Marina Bay",
    stage: "Finishing",
    responsibleStakeholder: "Contractor X",
    natureOfObservation: "Recurring parapet seepage after last week's rain event.",
    technicalRootCause: "Membrane termination lap short by ~40mm at corner detail.",
    raisedBy: "Site Engineer — R. Sharma",
    images: { before: [MOCK_IMG.waterproof, MOCK_IMG.facade] },
    replies: [
      {
        id: "r1",
        author: "Ar. Sharma",
        timestamp: "2026-07-04T09:45:00Z",
        text: "Stop work on parapet area. Contractor X notified. Send more photos from the east corner.",
      },
    ],
  },
  {
    id: "o2",
    serialNo: 2,
    _source: "query",
    type: "query",
    source: "manual",
    status: "open",
    description: "Rebar spacing mismatch in core wall — 200mm actual vs 150mm spec.",
    category: "Structural",
    location: "Tower A · Floor 7 · Core B",
    dateRaised: "2026-07-03",
    createdAt: "2026-07-03T14:22:00Z",
    projectType: "Commercial",
    projectName: "Tower A — Marina Bay",
    stage: "Structure",
    responsibleStakeholder: "Structural PMC",
    natureOfObservation: "Rebar bar centre-to-centre deviates from GFC drawing.",
    technicalRootCause: "Layout error at core wall reinforcement setup.",
    raisedBy: "Structural Engineer",
    images: { before: [MOCK_IMG.rebar] },
    replies: [],
  },
  {
    id: "o3",
    serialNo: 3,
    _source: "query",
    type: "query",
    source: "manual",
    status: "resolved",
    description: "HVAC duct clearance below beam soffit — insufficient for ceiling grid.",
    category: "HVAC",
    location: "Tower A · Floor 9 · Zone C",
    dateRaised: "2026-06-28",
    createdAt: "2026-06-28T11:10:00Z",
    projectType: "Commercial",
    projectName: "Tower A — Marina Bay",
    stage: "MEP",
    responsibleStakeholder: "MEP Contractor",
    natureOfObservation: "Duct clashes with beam soffit — ceiling drop-down impacted.",
    technicalRootCause: "MEP shop drawing did not coordinate with structural beam depths.",
    raisedBy: "MEP Engineer",
    images: { before: [MOCK_IMG.mep], after: [MOCK_IMG.mep] },
    solutionDescription:
      "Reroute duct via alternate corridor. Update coordination drawing set.",
    solutionMode: "Rework + Design Update",
    suggestedResolution: "Reroute duct through corridor #C7 and issue revised RCP.",
    resolutionDescription: "Duct rerouted, RCP updated, ceiling grid clearance achieved.",
    resolvedDate: "2026-07-02",
    replies: [
      {
        id: "r2",
        author: "MEP Lead",
        timestamp: "2026-07-01T09:00:00Z",
        text: "Reroute approved. Revised drawing shared.",
      },
    ],
  },
  {
    id: "o4",
    serialNo: 4,
    _source: "update",
    type: "update",
    source: "manual",
    status: "open",
    description: "Facade panel installation started at north elevation.",
    category: "Facade",
    location: "Tower A · Elevation North",
    dateRaised: "2026-07-06",
    createdAt: "2026-07-06T08:00:00Z",
    projectType: "Commercial",
    projectName: "Tower A — Marina Bay",
    stage: "Facade",
    responsibleStakeholder: "Facade Contractor",
    images: { before: [MOCK_IMG.facade] },
    replies: [],
  },
  {
    id: "o5",
    serialNo: 5,
    _source: "site-report",
    source: "pptx",
    status: "resolved",
    description: "Staircase landing rebar not tied at 12 locations — flagged during pre-pour walk.",
    category: "Structural",
    location: "Tower B · Core A · Landing L4",
    dateRaised: "2026-05-15",
    projectType: "Residential",
    projectName: "Residences Phase 2",
    stage: "Structure",
    responsibleStakeholder: "Structural Contractor",
    natureOfObservation: "Rebar ties missed at multiple critical joints on landing.",
    technicalRootCause: "Rushed pre-pour prep without proper QA/QC checklist.",
    raisedBy: "Structural QC",
    sourceFile: "Site Report — May 2026 W2.pptx",
    solutionDescription: "All ties inserted before pour. QC sign-off obtained.",
    solutionMode: "Corrective",
    resolutionDescription: "All 12 locations tied and re-inspected before concrete pour.",
    resolvedDate: "2026-05-16",
    images: { before: [MOCK_IMG.stair], after: [MOCK_IMG.stair] },
    replies: [],
  },
  {
    id: "o6",
    serialNo: 6,
    _source: "site-report",
    source: "pptx",
    status: "open",
    description: "Floor tile lippage exceeds tolerance in retail zone.",
    category: "Flooring",
    location: "Mall Block C · GF · Retail Bay 3",
    dateRaised: "2026-06-10",
    projectType: "Retail",
    projectName: "Mall Block C",
    stage: "Finishing",
    responsibleStakeholder: "Tiling Contractor",
    sourceFile: "Site Report — Jun 2026 W1.pptx",
    images: { before: [MOCK_IMG.flooring] },
    replies: [],
  },
  {
    id: "o7",
    serialNo: 7,
    _source: "site-report",
    source: "pptx",
    status: "resolved",
    description: "Electrical conduit clash at slab cutout — routing correction issued.",
    category: "Electrical",
    location: "Office Tower East · Floor 5",
    dateRaised: "2026-04-20",
    projectType: "Commercial",
    projectName: "Office Tower East",
    stage: "MEP",
    responsibleStakeholder: "Electrical Contractor",
    sourceFile: "Site Report — Apr 2026 W3.pptx",
    solutionDescription: "Conduit rerouted to secondary sleeve. No slab impact.",
    resolutionDescription: "Rerouting completed and verified against updated shop drawings.",
    resolvedDate: "2026-04-25",
    images: { before: [MOCK_IMG.electrical], after: [MOCK_IMG.electrical] },
    replies: [],
  },
  {
    id: "o8",
    serialNo: 8,
    _source: "site-report",
    source: "pptx",
    status: "resolved",
    description: "Painting touch-ups required in stair core — patchy finish.",
    category: "Painting",
    location: "Tower A · Core B · Floor 5-8",
    dateRaised: "2026-03-12",
    projectType: "Commercial",
    projectName: "Tower A — Marina Bay",
    stage: "Finishing",
    responsibleStakeholder: "Painting Contractor",
    sourceFile: "Site Report — Mar 2026 W2.pptx",
    solutionDescription: "Second coat applied after surface prep. QC signed off.",
    resolvedDate: "2026-03-15",
    images: { before: [MOCK_IMG.finishing], after: [MOCK_IMG.finishing] },
    replies: [],
  },
];

export const MOCK_DASHBOARD: DashboardStats = {
  siteReports: { total: 1236, resolved: 891, open: 345 },
  queries: { total: 24, open: 9, resolved: 15 },
  updates: { total: 47 },
  projects: MOCK_PROJECTS,
  categoryBreakdown: {
    Structural: { total: 128, open: 32, resolved: 96 },
    MEP: { total: 96, open: 24, resolved: 72 },
    Finishes: { total: 87, open: 18, resolved: 69 },
    Waterproofing: { total: 74, open: 21, resolved: 53 },
    Electrical: { total: 63, open: 12, resolved: 51 },
    Facade: { total: 58, open: 15, resolved: 43 },
    HVAC: { total: 42, open: 9, resolved: 33 },
    Plumbing: { total: 38, open: 7, resolved: 31 },
  },
  recentManual: [],
};
MOCK_DASHBOARD.recentManual = MOCK_OBSERVATIONS.filter((o) => o._source !== "site-report").slice(0, 6);

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hi — I'm the BEM Engineer. I can analyze site trends, suggest resolutions based on past patterns, or answer construction PM queries. Ask me anything about your active projects.",
    timestamp: "2026-07-06T09:00:00Z",
  },
];

export const AI_REPLIES = [
  "Based on the last 30 resolved queries in Waterproofing, the pattern strongly suggests a corner detail lap issue. I recommend checking membrane termination and pulling SD-WP-012 for reference.",
  "3 similar rebar spacing mismatches were resolved in Tower B (Jan–Mar 2026) via same-day corrective ties. Estimated resolution time: <24h if contractor mobilizes today.",
  "Top open categories: Structural (32), MEP (24), Waterproofing (21). Critical clusters: parapet seepage, core wall rebar, HVAC duct clearance. Recommend priority PMC walk this week.",
  "The stakeholder pattern shows Contractor X flagged 5 times in last 60 days. Consider quality escalation meeting with project head.",
  "I don't have direct data on that specific detail. Try uploading the drawing or check standard detail library — closest match is SD-STAIR-007.",
];

export const MOCK_REPORTS: GeneratedReport[] = [
  {
    id: "rep1",
    projectName: "Tower A — Weekly Intelligence",
    date: "2026-07-01",
    createdAt: "2026-07-01T18:00:00Z",
    itemCount: 12,
    items: MOCK_OBSERVATIONS.slice(0, 4),
  },
  {
    id: "rep2",
    projectName: "Mall Block C — Finishing Audit",
    date: "2026-06-25",
    createdAt: "2026-06-25T16:30:00Z",
    itemCount: 8,
    items: MOCK_OBSERVATIONS.slice(3, 6),
  },
  {
    id: "rep3",
    projectName: "Residences Phase 2 — Structural QC",
    date: "2026-06-15",
    createdAt: "2026-06-15T12:00:00Z",
    itemCount: 15,
    items: MOCK_OBSERVATIONS.slice(4, 8),
  },
];

export function findObservation(id: string): Observation | undefined {
  return MOCK_OBSERVATIONS.find((o) => o.id === id);
}

export function findReport(id: string): GeneratedReport | undefined {
  return MOCK_REPORTS.find((r) => r.id === id);
}
