import { useMemo, useState } from "react";
import {
  Search, ChevronRight, Image as ImageIcon, Database, List, CalendarDays,
  Plus, MessageSquare,
} from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { MonthlyCalendar } from "@/features/site-agent/monthly-calendar";
import { useSiteData, imageUrl } from "@/features/site-agent/data-source";
import type { Observation } from "@/features/site-agent/mock-data";

type SourceFilter = "all" | "site-report" | "query" | "update";
type StatusFilter = "all" | "open" | "resolved";
type ViewMode = "list" | "calendar";

interface Filters {
  source: SourceFilter;
  status: StatusFilter;
  category: string;
  projectType: string;
  search: string;
}

const SourceBadge = ({ source }: { source: Observation["_source"] }) => {
  const styles: Record<string, string> = {
    "site-report": "bg-gray-800 text-white",
    query: "bg-amber-50 text-amber-700 border border-amber-200",
    update: "bg-blue-50 text-blue-600 border border-blue-200",
  };
  const labels: Record<string, string> = {
    "site-report": "Site Update",
    query: "Query",
    update: "Update",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
        styles[source] || styles.query
      }`}
    >
      {labels[source] || source}
    </span>
  );
};

const EntryCard = ({ entry }: { entry: Observation }) => {
  const imgCount =
    (entry.images?.before?.length || 0) + (entry.images?.after?.length || 0);
  const firstImg = entry.images?.before?.[0] || entry.images?.after?.[0];

  const handleClick = () => {
    window.location.href = `/user/sa-observation-detail?id=${entry.id}`;
  };

  return (
    <div
      className="group p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer bg-white"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
          {firstImg ? (
            <img src={imageUrl(firstImg)} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={16} className="text-gray-300" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <SourceBadge source={entry._source} />
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                entry.status === "resolved"
                  ? "bg-green-50 text-green-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {entry.status}
            </span>
            <span className="text-[10px] text-gray-400">#{entry.serialNo}</span>
            {imgCount > 0 && (
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                <ImageIcon size={10} /> {imgCount}
              </span>
            )}
            {(entry.replies?.length ?? 0) > 0 && (
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                <MessageSquare size={10} /> {entry.replies?.length}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
            {entry.description || entry.category || "No description"}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
            <span className="truncate max-w-[200px]">{entry.category}</span>
            {entry.location && (
              <>
                <span>·</span>
                <span className="truncate max-w-[150px]">{entry.location}</span>
              </>
            )}
            {entry.sourceFile && (
              <>
                <span>·</span>
                <span>{entry.sourceFile}</span>
              </>
            )}
            <span>·</span>
            <span>{entry.dateRaised}</span>
            {entry.projectType && (
              <>
                <span>·</span>
                <span className="font-medium">{entry.projectType}</span>
              </>
            )}
          </div>
        </div>
        {entry.status === "resolved" && entry.solutionDescription && (
          <div className="hidden md:block max-w-[200px] shrink-0">
            <p className="text-[10px] font-bold text-green-600 uppercase mb-0.5">
              Resolution
            </p>
            <p className="text-[11px] text-gray-400 line-clamp-2">
              {entry.solutionDescription}
            </p>
          </div>
        )}
        <ChevronRight
          size={14}
          className="text-gray-200 group-hover:text-black transition-colors shrink-0 mt-1"
        />
      </div>
    </div>
  );
};

export function SaObservationsPage() {
  const { loading, observations, projects, categories } = useSiteData();
  const [filters, setFilters] = useState<Filters>({
    source: "all",
    status: "all",
    category: "all",
    projectType: "all",
    search: "",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const LIMIT = 50;
  const [visibleSiteCount, setVisibleSiteCount] = useState(LIMIT);

  const matchesSearch = (o: Observation, q: string) => {
    if (!q) return true;
    const needle = q.toLowerCase();
    return (
      o.description?.toLowerCase().includes(needle) ||
      o.category?.toLowerCase().includes(needle) ||
      o.location?.toLowerCase().includes(needle) ||
      false
    );
  };

  // Site reports (from live data)
  const allSiteReports = useMemo(
    () =>
      observations.filter((o) => o._source === "site-report").filter(
        (o) => {
          if (filters.status !== "all" && o.status !== filters.status) return false;
          if (filters.category !== "all" && o.category !== filters.category) return false;
          if (!matchesSearch(o, filters.search)) return false;
          return true;
        },
      ),
    [observations, filters.status, filters.category, filters.search],
  );

  // Queries + updates
  const allQueries = useMemo(
    () =>
      observations.filter(
        (o) => o._source === "query" || o._source === "update",
      ).filter((o) => {
        if (filters.status !== "all" && o.status !== filters.status) return false;
        if (filters.projectType !== "all" && o.projectType !== filters.projectType)
          return false;
        if (filters.source === "query" && o.type !== "query") return false;
        if (filters.source === "update" && o.type !== "update") return false;
        if (!matchesSearch(o, filters.search)) return false;
        return true;
      }),
    [observations, filters.status, filters.projectType, filters.source, filters.search],
  );

  const shouldShowSite =
    filters.source === "all" || filters.source === "site-report";
  const shouldShowQueries =
    filters.source === "all" ||
    filters.source === "query" ||
    filters.source === "update";

  const siteReports = shouldShowSite ? allSiteReports : [];
  const queries = shouldShowQueries ? allQueries : [];

  const siteTotal = shouldShowSite ? allSiteReports.length : 0;
  const siteResolved = shouldShowSite
    ? allSiteReports.filter((o) => o.status === "resolved").length
    : 0;
  const siteOpen = shouldShowSite
    ? allSiteReports.filter((o) => o.status === "open").length
    : 0;
  const queryTotal = queries.length;
  const totalCombined = siteTotal + queryTotal;

  const visibleSiteReports = siteReports.slice(0, visibleSiteCount);

  const mergedEntries = useMemo(() => {
    const all: Observation[] = [];
    visibleSiteReports.forEach((r) => all.push({ ...r, _source: "site-report" }));
    queries.forEach((q) =>
      all.push({ ...q, _source: q.type === "update" ? "update" : "query" }),
    );
    all.sort((a, b) => {
      const dateA = a.dateRaised || a.createdAt || "";
      const dateB = b.dateRaised || b.createdAt || "";
      return dateB.localeCompare(dateA);
    });
    return all;
  }, [visibleSiteReports, queries]);

  const calendarEntries = useMemo(() => {
    const all: Observation[] = [];
    siteReports.forEach((r) => all.push({ ...r, _source: "site-report" }));
    queries.forEach((q) =>
      all.push({ ...q, _source: q.type === "update" ? "update" : "query" }),
    );
    return all;
  }, [siteReports, queries]);

  const handleCalendarClick = (entry: Observation) => {
    window.location.href = `/user/sa-observation-detail?id=${entry.id}`;
  };

  const loadMore = () => setVisibleSiteCount((n) => n + LIMIT);

  if (loading) {
    return (
      <EdifiShell system="site-agent" activeNav="observations" section="user">
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      </EdifiShell>
    );
  }

  return (
    <EdifiShell system="site-agent" activeNav="observations" section="user">
      <div className="animate-in fade-in">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database size={18} className="text-gray-400" />
              <h2 className="text-2xl font-bold">Observations</h2>
            </div>
            <p className="text-sm text-gray-400">
              {totalCombined} total entries across site updates &amp; queries
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List size={13} /> List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "calendar"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <CalendarDays size={13} /> Calendar
              </button>
            </div>
            <a
              href="/user/sa-capture"
              className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:opacity-80 transition-opacity flex items-center gap-1.5"
            >
              <Plus size={14} /> New Observation
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-2 mb-6 flex-wrap text-xs font-bold">
          <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
            {siteTotal} site updates
          </span>
          <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
            {queryTotal} queries &amp; updates
          </span>
          <span className="px-3 py-1.5 rounded-full bg-green-50 text-green-600 border border-green-100">
            {siteResolved} resolved
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
            {siteOpen} open
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              placeholder="Search all observations..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
          <select
            value={filters.source}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                source: e.target.value as SourceFilter,
              }))
            }
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors"
          >
            <option value="all">All Sources</option>
            <option value="site-report">Site Updates</option>
            <option value="query">Queries</option>
            <option value="update">Updates</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                status: e.target.value as StatusFilter,
              }))
            }
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none appearance-none cursor-pointer hover:border-gray-400 transition-colors max-w-[200px]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filters.projectType}
            onChange={(e) =>
              setFilters((f) => ({ ...f, projectType: e.target.value }))
            }
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-2 appearance-none cursor-pointer"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {totalCombined === 0 ? (
          <div className="text-center py-20">
            <Database size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-300 text-lg mb-4">No observations yet</p>
            <a
              href="/user/sa-capture"
              className="inline-block px-6 py-3 bg-black text-white rounded-full text-sm font-bold hover:opacity-80 transition-opacity"
            >
              Add Your First Observation
            </a>
          </div>
        ) : viewMode === "calendar" ? (
          <MonthlyCalendar
            entries={calendarEntries}
            onClickEntry={handleCalendarClick}
          />
        ) : (
          <>
            <div className="space-y-2">
              {mergedEntries.map((entry) => (
                <EntryCard
                  key={`${entry._source}-${entry.id}`}
                  entry={entry}
                />
              ))}
            </div>

            {/* Load More for site reports */}
            {shouldShowSite && visibleSiteReports.length < siteTotal && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  className="text-xs font-bold px-5 py-2 border border-gray-200 rounded-full hover:border-black transition-colors"
                >
                  Load More Site Updates ({visibleSiteReports.length} of {siteTotal})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </EdifiShell>
  );
}
