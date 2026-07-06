import {
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Building2,
  Layers,
  ChevronRight,
  FileText,
  Database,
  Plus,
} from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { useSiteData } from "@/features/site-agent/data-source";
import type { Observation } from "@/features/site-agent/mock-data";

export function SaDashboardPage() {
  const { loading, dashboard } = useSiteData();

  if (loading) {
    return (
      <EdifiShell system="site-agent" activeNav="dashboard" section="user">
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      </EdifiShell>
    );
  }

  const { siteReports, queries, updates, projects, categoryBreakdown, recentManual } = dashboard;

  const topCategories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 8);
  const maxCatCount = topCategories.length ? topCategories[0][1].total : 1;

  const resolutionPct = siteReports.total
    ? Math.round((siteReports.resolved / siteReports.total) * 100)
    : 0;

  return (
    <EdifiShell system="site-agent" activeNav="dashboard" section="user">
      <div className="animate-in fade-in">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Site Intelligence</h1>
          <p className="text-gray-400 text-base">
            Real-time overview of site data, queries, and project health.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div
            className="rounded-2xl p-5 bg-gray-900 text-white cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => (window.location.href = "/user/sa-observations")}
          >
            <Database size={20} className="mb-3 opacity-60" />
            <p className="text-3xl font-bold">{siteReports.total}</p>
            <p className="text-xs mt-1 opacity-70 font-medium uppercase tracking-widest">
              Site Updates
            </p>
            <p className="text-[10px] mt-0.5 opacity-50">
              {siteReports.resolved} resolved · {siteReports.open} open
            </p>
          </div>
          <div
            className="rounded-2xl p-5 bg-amber-50 text-amber-600 border border-amber-100 cursor-pointer hover:bg-amber-100/50 transition-colors"
            onClick={() => (window.location.href = "/user/sa-observations")}
          >
            <AlertCircle size={20} className="mb-3 opacity-60" />
            <p className="text-3xl font-bold">{queries.open}</p>
            <p className="text-xs mt-1 opacity-70 font-medium uppercase tracking-widest">
              Open Queries
            </p>
          </div>
          <div
            className="rounded-2xl p-5 bg-green-50 text-green-600 border border-green-100 cursor-pointer hover:bg-green-100/50 transition-colors"
            onClick={() => (window.location.href = "/user/sa-observations")}
          >
            <CheckCircle2 size={20} className="mb-3 opacity-60" />
            <p className="text-3xl font-bold">{queries.resolved}</p>
            <p className="text-xs mt-1 opacity-70 font-medium uppercase tracking-widest">
              Resolved
            </p>
          </div>
          <div className="rounded-2xl p-5 bg-blue-50 text-blue-600 border border-blue-100">
            <Layers size={20} className="mb-3 opacity-60" />
            <p className="text-3xl font-bold">{updates.total}</p>
            <p className="text-xs mt-1 opacity-70 font-medium uppercase tracking-widest">
              Updates
            </p>
          </div>
        </div>

        {/* Training Data Overview */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Training Data — Site Updates Analysis
            </p>
            <button
              onClick={() => (window.location.href = "/user/sa-observations")}
              className="text-xs font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-1000"
                  style={{ width: `${resolutionPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{siteReports.resolved} resolved</span>
                <span>{siteReports.open} open</span>
              </div>
            </div>
            <span className="text-2xl font-bold">{resolutionPct}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Breakdown from Training Data */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
              Category Breakdown (Training Data)
            </p>
            <div className="space-y-3">
              {topCategories.map(([cat, stats]) => (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 truncate mr-2">{cat}</span>
                    <span className="text-gray-400 shrink-0">
                      {stats.total} ({stats.open} open)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-green-400 rounded-l-full"
                      style={{ width: `${(stats.resolved / maxCatCount) * 100}%` }}
                    />
                    <div
                      className="h-full bg-amber-400"
                      style={{ width: `${(stats.open / maxCatCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Active Projects
              </p>
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-300 mb-3">No active projects yet</p>
                <button
                  onClick={() => (window.location.href = "/user/sa-capture")}
                  className="text-xs font-bold px-4 py-2 bg-black text-white rounded-full hover:opacity-80 transition-opacity"
                >
                  + Add First Observation
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer group"
                    onClick={() => (window.location.href = "/user/sa-observations")}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400">
                        {p.totalQueries} queries · {p.openQueries} open
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-gray-300 group-hover:text-black transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {recentManual.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
              Recent Activity
            </p>
            <div className="space-y-2">
              {recentManual.slice(0, 8).map((q: Observation) => (
                <div
                  key={q.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() =>
                    (window.location.href = `/user/sa-observation-detail?id=${q.id}`)
                  }
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      q.status === "open" ? "bg-amber-400" : "bg-green-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      q.type === "update"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {q.type}
                  </span>
                  <p className="text-sm truncate flex-1">
                    {q.description ? q.description.substring(0, 80) : "No description"}
                  </p>
                  <span className="text-xs text-gray-400 shrink-0">{q.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "New Observation",
              desc: "Register a query or update",
              href: "/user/sa-capture",
              icon: Plus,
            },
            {
              label: "Observations",
              desc: "Browse all site data",
              href: "/user/sa-observations",
              icon: Database,
            },
            {
              label: "Export Report",
              desc: "Build intelligence report",
              href: "/user/sa-generate-report",
              icon: FileText,
            },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => (window.location.href = a.href)}
              className="text-left p-5 rounded-2xl border border-gray-100 hover:border-black hover:shadow-lg transition-all group"
            >
              <a.icon
                size={20}
                className="text-gray-400 group-hover:text-black transition-colors mb-3"
              />
              <p className="font-bold text-sm">{a.label}</p>
              <p className="text-xs text-gray-400 mt-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </EdifiShell>
  );
}
