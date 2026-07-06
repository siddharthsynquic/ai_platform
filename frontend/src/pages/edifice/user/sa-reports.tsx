import { useState } from "react";
import {
  FileText,
  LayoutGrid,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Trash2,
  AlertTriangle,
  Download,
  Loader2,
  Sparkles,
  Send,
} from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { useSiteData, imageUrl } from "@/features/site-agent/data-source";
import type { GeneratedReport } from "@/features/site-agent/mock-data";

type Mode = "cards" | "calendar";
type MonthState = { year: number; month: number };
type CardLayout = "grid" | "list";

function getFirstImage(r: GeneratedReport): string | undefined {
  for (const item of r.items ?? []) {
    const upload = item.imagePaths?.[0];
    if (upload) return upload;
    const before = item.images?.before?.[0];
    if (before) return before;
    const after = item.images?.after?.[0];
    if (after) return after;
  }
  return undefined;
}

export function SaReportsPage() {
  const { loading, reports, deleteReport } = useSiteData();
  const [mode, setMode] = useState<Mode>("cards");
  const [month, setMonth] = useState<MonthState>(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GeneratedReport | null>(null);
  const [viewingReport, setViewingReport] = useState<GeneratedReport | null>(null);
  const [refineText, setRefineText] = useState("");
  const [refining, setRefining] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleDelete = (id: string) => {
    deleteReport(id);
    setDeleteTarget(null);
  };

  const handleRefine = () => {
    const prompt = refineText.trim();
    if (!prompt) return;
    setRefining(true);
    // Mock: pretend to refine
    setTimeout(() => {
      console.log("[mock] refine:", prompt);
      setRefineText("");
      setRefining(false);
    }, 400);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      console.log("[mock] export ZIP for", viewingReport?.id);
      alert("Export would download ZIP");
      setExporting(false);
    }, 300);
  };

  // ── Report card (grid or list) ──
  const ReportCard = ({ r, layout = "grid" }: { r: GeneratedReport; layout?: CardLayout }) => {
    const firstImg = getFirstImage(r);
    if (layout === "list") {
      return (
        <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-300 transition-all">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
            {firstImg ? (
              <img src={imageUrl(firstImg)} alt="" className="w-full h-full object-cover" />
            ) : (
              <FileText size={20} className="text-gray-300" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm truncate">{r.projectName}</h4>
            <p className="text-xs text-gray-400">
              {r.itemCount || "?"} observations ·{" "}
              {new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewingReport(r)}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:opacity-80 transition-opacity"
            >
              View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(r);
              }}
              className="p-2 rounded-xl border border-gray-200 text-gray-300 hover:text-red-500 hover:border-red-200 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      );
    }
    // Grid card
    return (
      <div className="group cursor-pointer rounded-2xl border border-gray-100 hover:border-black hover:shadow-xl transition-all bg-white overflow-hidden">
        <div
          className="aspect-[16/9] bg-gray-50 flex items-center justify-center overflow-hidden"
          onClick={() => setViewingReport(r)}
        >
          {firstImg ? (
            <img
              src={imageUrl(firstImg)}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <FileText size={36} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1" onClick={() => setViewingReport(r)}>
              <h3 className="font-bold text-sm mb-0.5 truncate">{r.projectName}</h3>
              <p className="text-xs text-gray-400">
                {r.date} · {r.itemCount || "?"} obs
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(r);
              }}
              className="p-1.5 rounded-lg text-gray-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div
            className="mt-3 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-300 group-hover:text-black transition-colors cursor-pointer"
            onClick={() => setViewingReport(r)}
          >
            View <ChevronRight size={12} />
          </div>
        </div>
      </div>
    );
  };

  // ── Calendar helpers ──
  const daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
  const firstDayOfWeek = new Date(month.year, month.month, 1).getDay();
  const monthName = new Date(month.year, month.month).toLocaleString("default", { month: "long" });

  const reportsByDate: Record<string, GeneratedReport[]> = {};
  reports.forEach((r) => {
    const d = r.date || r.createdAt?.split("T")[0];
    if (d) {
      if (!reportsByDate[d]) reportsByDate[d] = [];
      reportsByDate[d].push(r);
    }
  });

  const prevMonth = () =>
    setMonth((m) => (m.month === 0 ? { year: m.year - 1, month: 11 } : { ...m, month: m.month - 1 }));
  const nextMonth = () =>
    setMonth((m) => (m.month === 11 ? { year: m.year + 1, month: 0 } : { ...m, month: m.month + 1 }));

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const selectedDateStr = selectedDate
    ? `${month.year}-${String(month.month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
    : null;
  const selectedReports = selectedDateStr ? reportsByDate[selectedDateStr] || [] : [];

  // ── Preview view ──
  if (viewingReport) {
    const report = viewingReport;
    return (
      <EdifiShell system="site-agent" activeNav="reports" section="user">
        <div className="w-full animate-in fade-in zoom-in-95 duration-500">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewingReport(null)}
                className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-all"
              >
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <div>
                <h2 className="text-xl font-bold tracking-tight leading-tight">{report.projectName}</h2>
                <p className="text-xs text-gray-400">
                  {report.date} · {report.itemCount || "?"} observations
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                disabled={exporting || refining}
                className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold hover:border-black disabled:opacity-40 transition-all"
              >
                {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                {exporting ? "Exporting…" : "Export ZIP"}
              </button>
              <button
                onClick={() => setViewingReport(null)}
                className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                Done
              </button>
            </div>
          </div>

          {/* Report Preview (real HTML from reference dir via Vite middleware) */}
          <div
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-950 mb-5"
            style={{ height: "calc(100vh - 280px)", minHeight: "400px" }}
          >
            <iframe
              src={`/reports/${report.id}.html`}
              className="w-full h-full border-none"
              title={`Report — ${report.projectName}`}
              style={{ background: "#0a0a0a", width: "100%", height: "100%" }}
            />
          </div>

          {/* Refine Bar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <Sparkles size={14} className={refining ? "text-black animate-pulse" : "text-gray-300"} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 hidden sm:inline">
                  Refine
                </span>
              </div>
              <input
                type="text"
                value={refineText}
                onChange={(e) => setRefineText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRefine()}
                placeholder="Tell AI what to change… e.g. ‘add more detail on slide 3’, ‘make the risk table more visual’"
                disabled={refining}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50"
              />
              <button
                onClick={handleRefine}
                disabled={refining || !refineText.trim()}
                className="p-2.5 bg-black text-white rounded-xl hover:opacity-80 disabled:opacity-20 transition-all shrink-0"
              >
                {refining ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>
          </div>
        </div>
      </EdifiShell>
    );
  }

  // ── Loading state ──
  if (loading) {
    return (
      <EdifiShell system="site-agent" activeNav="reports" section="user">
        <div className="flex items-center justify-center py-32">
          <Loader2 size={28} className="animate-spin text-gray-400" />
        </div>
      </EdifiShell>
    );
  }

  // ── History view ──
  return (
    <EdifiShell system="site-agent" activeNav="reports" section="user">
      <div>
        {/* Header + Toggle */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Report History</h2>
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMode("cards")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === "cards" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid size={14} /> Cards
            </button>
            <button
              onClick={() => setMode("calendar")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === "calendar" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Calendar size={14} /> Calendar
            </button>
          </div>
        </div>

        {/* ── Cards Mode ── */}
        {mode === "cards" &&
          (!reports.length ? (
            <div className="py-20 text-center">
              <FileText size={40} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">No reports yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...reports].reverse().map((r) => (
                <ReportCard key={r.id} r={r} layout="grid" />
              ))}
            </div>
          ))}

        {/* ── Calendar Mode ── */}
        {mode === "calendar" && (
          <>
            <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl border border-gray-200 hover:border-black transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <h3 className="text-lg font-bold tracking-tight">
                  {monthName} {month.year}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-gray-200 hover:border-black transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] font-bold text-gray-300 uppercase tracking-widest py-2"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;
                  const dateStr = `${month.year}-${String(month.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const hasReports = !!reportsByDate[dateStr];
                  const count = reportsByDate[dateStr]?.length || 0;
                  const isSelected = selectedDate === day;
                  const isToday = (() => {
                    const t = new Date();
                    return (
                      t.getFullYear() === month.year &&
                      t.getMonth() === month.month &&
                      t.getDate() === day
                    );
                  })();

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(isSelected ? null : day)}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-medium transition-all
                        ${
                          isSelected
                            ? "bg-black text-white shadow-lg scale-105"
                            : hasReports
                              ? "bg-gray-50 hover:bg-gray-100 text-black"
                              : "hover:bg-gray-50 text-gray-400"
                        }
                        ${isToday && !isSelected ? "ring-2 ring-black/10" : ""}`}
                    >
                      {day}
                      {hasReports && (
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                            <div
                              key={j}
                              className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/70" : "bg-black"}`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected date reports */}
            {selectedDate && (
              <div className="animate-in fade-in">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {selectedReports.length
                    ? `${selectedReports.length} report${selectedReports.length > 1 ? "s" : ""} on ${monthName} ${selectedDate}`
                    : `No reports on ${monthName} ${selectedDate}`}
                </p>
                {selectedReports.length > 0 && (
                  <div className="space-y-3">
                    {selectedReports.map((r) => (
                      <ReportCard key={r.id} r={r} layout="list" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!reports.length && (
              <div className="py-20 text-center">
                <FileText size={40} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">No reports yet.</p>
              </div>
            )}
          </>
        )}

        {/* Delete Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl modal-content">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
                <AlertTriangle size={22} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Delete Report?</h3>
              <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
                This will permanently remove <strong>"{deleteTarget.projectName}"</strong> and all
                associated observations, images, and audio files.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteTarget.id)}
                  className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </EdifiShell>
  );
}
