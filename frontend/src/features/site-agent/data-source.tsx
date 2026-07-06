import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  ChatMessage,
  DashboardStats,
  GeneratedReport,
  Observation,
  Project,
} from "./mock-data";
import { MOCK_DASHBOARD, MOCK_PROJECTS, PROJECT_TYPES } from "./mock-data";

interface RawQuery {
  id: string;
  dataType?: string;
  type?: string;
  source?: string;
  projectType?: string | null;
  projectName?: string | null;
  stage?: string | null;
  location?: string | null;
  serialNo?: string | number;
  dateRaised?: string;
  category?: string;
  description?: string;
  natureOfObservation?: string | null;
  technicalRootCause?: string | null;
  raisedBy?: string | null;
  responsibleStakeholder?: string | null;
  status?: string;
  resolvedDate?: string | null;
  suggestedResolution?: string | null;
  solutionDescription?: string | null;
  solutionMode?: string | null;
  resolutionDescription?: string | null;
  images?: { before?: string[]; after?: string[] } | null;
  linkedResolutionId?: string | null;
  audioPath?: string | null;
  transcribedText?: string | null;
  replies?: unknown[];
  sourceFile?: string | null;
  slideNumber?: number;
  createdAt?: string;
  updatedAt?: string;
}

function normalize(raw: RawQuery): Observation {
  const isReport = raw.dataType === "site-report" || raw.source === "pptx";
  const sourceKind: Observation["_source"] = isReport
    ? "site-report"
    : raw.type === "update"
      ? "update"
      : "query";
  const serial = typeof raw.serialNo === "string" ? parseInt(raw.serialNo, 10) || 0 : (raw.serialNo ?? 0);
  return {
    id: raw.id,
    serialNo: serial,
    _source: sourceKind,
    type: raw.type === "update" ? "update" : "query",
    source: isReport ? "pptx" : "manual",
    status: raw.status === "resolved" ? "resolved" : "open",
    description: raw.description || raw.category || "",
    category: raw.category || "General",
    location: raw.location || undefined,
    dateRaised: raw.dateRaised || raw.createdAt?.slice(0, 10) || "",
    createdAt: raw.createdAt,
    projectType: raw.projectType || undefined,
    projectName: raw.projectName || undefined,
    stage: raw.stage || undefined,
    responsibleStakeholder: raw.responsibleStakeholder || undefined,
    natureOfObservation: raw.natureOfObservation || undefined,
    technicalRootCause: raw.technicalRootCause || undefined,
    raisedBy: raw.raisedBy || undefined,
    sourceFile: raw.sourceFile || undefined,
    solutionDescription: raw.solutionDescription || undefined,
    solutionMode: raw.solutionMode || undefined,
    suggestedResolution: raw.suggestedResolution || undefined,
    resolutionDescription: raw.resolutionDescription || undefined,
    resolvedDate: raw.resolvedDate || undefined,
    images: raw.images || undefined,
    replies: (raw.replies as Observation["replies"]) || [],
  };
}

function computeDashboard(obs: Observation[]): DashboardStats {
  const siteAll = obs.filter((o) => o._source === "site-report");
  const queryAll = obs.filter((o) => o._source === "query");
  const updateAll = obs.filter((o) => o._source === "update");

  const siteReports = {
    total: siteAll.length,
    resolved: siteAll.filter((o) => o.status === "resolved").length,
    open: siteAll.filter((o) => o.status === "open").length,
  };
  const queries = {
    total: queryAll.length,
    open: queryAll.filter((o) => o.status === "open").length,
    resolved: queryAll.filter((o) => o.status === "resolved").length,
  };
  const updates = { total: updateAll.length };

  const catMap: Record<string, { total: number; open: number; resolved: number }> = {};
  siteAll.forEach((o) => {
    const cat = o.category || "General";
    if (!catMap[cat]) catMap[cat] = { total: 0, open: 0, resolved: 0 };
    catMap[cat].total++;
    if (o.status === "resolved") catMap[cat].resolved++;
    else catMap[cat].open++;
  });

  const projMap: Record<string, { totalQueries: number; openQueries: number }> = {};
  [...queryAll, ...updateAll].forEach((o) => {
    const name = o.projectName || o.projectType || "General";
    if (!projMap[name]) projMap[name] = { totalQueries: 0, openQueries: 0 };
    projMap[name].totalQueries++;
    if (o.status === "open") projMap[name].openQueries++;
  });
  const projects: Project[] = Object.entries(projMap).map(([name, s], i) => ({
    id: `p${i + 1}`,
    name,
    totalQueries: s.totalQueries,
    openQueries: s.openQueries,
  }));

  const recentManual = [...queryAll, ...updateAll]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 8);

  return {
    siteReports,
    queries,
    updates,
    projects: projects.length ? projects : MOCK_PROJECTS,
    categoryBreakdown: catMap,
    recentManual,
  };
}

interface SiteDataValue {
  loading: boolean;
  error: string | null;
  observations: Observation[];
  projects: Project[];
  projectTypes: string[];
  categories: string[];
  chatHistory: ChatMessage[];
  reports: GeneratedReport[];
  dashboard: DashboardStats;
  addReport: (r: GeneratedReport) => void;
  deleteReport: (id: string) => void;
  addReply: (obsId: string, reply: NonNullable<Observation["replies"]>[number]) => void;
  markResolved: (obsId: string) => void;
  reopen: (obsId: string) => void;
}

const SiteDataContext = createContext<SiteDataValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [qRes, cRes, rRes, pRes] = await Promise.all([
          fetch("/site-data/queries.json"),
          fetch("/site-data/chat-history.json"),
          fetch("/site-data/reports.json"),
          fetch("/site-data/projects.json"),
        ]);
        if (!qRes.ok) throw new Error(`queries.json ${qRes.status}`);
        const rawQueries: RawQuery[] = await qRes.json();
        const chat: ChatMessage[] = cRes.ok ? await cRes.json() : [];
        const reps: GeneratedReport[] = rRes.ok ? await rRes.json() : [];
        const projArr: unknown = pRes.ok ? await pRes.json() : [];
        if (cancelled) return;

        const obs = rawQueries.map(normalize);
        setObservations(obs);
        setChatHistory(Array.isArray(chat) ? chat : []);
        setReports(Array.isArray(reps) ? reps : []);
        setProjects(Array.isArray(projArr) ? (projArr as Project[]) : []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<SiteDataValue>(() => {
    const dashboard = computeDashboard(observations);
    const categories = Array.from(new Set(observations.map((o) => o.category).filter(Boolean))).sort();
    const projTypesRaw = observations
      .map((o) => o.projectType)
      .filter((t): t is string => !!t);
    const projectTypes = Array.from(new Set([...PROJECT_TYPES, ...projTypesRaw])).sort();
    const projectsFinal = projects.length
      ? projects
      : dashboard.projects.length
        ? dashboard.projects
        : MOCK_PROJECTS;

    return {
      loading,
      error,
      observations,
      projects: projectsFinal,
      projectTypes,
      categories,
      chatHistory,
      reports,
      dashboard: {
        ...dashboard,
        projects: projectsFinal,
        // fall back to mock category breakdown if real data has no categories yet
        categoryBreakdown:
          Object.keys(dashboard.categoryBreakdown).length > 0
            ? dashboard.categoryBreakdown
            : MOCK_DASHBOARD.categoryBreakdown,
      },
      addReport: (r) => setReports((prev) => [r, ...prev]),
      deleteReport: (id) => setReports((prev) => prev.filter((r) => r.id !== id)),
      addReply: (obsId, reply) =>
        setObservations((prev) =>
          prev.map((o) =>
            o.id === obsId ? { ...o, replies: [...(o.replies || []), reply] } : o,
          ),
        ),
      markResolved: (obsId) =>
        setObservations((prev) =>
          prev.map((o) => (o.id === obsId ? { ...o, status: "resolved" } : o)),
        ),
      reopen: (obsId) =>
        setObservations((prev) =>
          prev.map((o) => (o.id === obsId ? { ...o, status: "open" } : o)),
        ),
    };
  }, [loading, error, observations, chatHistory, reports, projects]);

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteDataValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used inside <SiteDataProvider>");
  return ctx;
}

export function useObservation(id: string | null | undefined): Observation | undefined {
  const { observations } = useSiteData();
  if (!id) return undefined;
  return observations.find((o) => o.id === id);
}

export function imageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  return path.startsWith("/") ? path : `/${path}`;
}
