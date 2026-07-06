import { useState } from "react";
import { FileText, CheckSquare, Search, Loader2, Zap } from "lucide-react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { useSiteData } from "@/features/site-agent/data-source";

export function SaGenerateReportPage() {
  const { loading, observations, addReport } = useSiteData();
  const [reportName, setReportName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const queries = observations;
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "resolved">(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = queries.filter((q) => {
    if (filterStatus !== "all" && q.status !== filterStatus) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return (
        (q.description || "").toLowerCase().includes(s) ||
        (q.category || "").toLowerCase().includes(s) ||
        (q.location || "").toLowerCase().includes(s)
      );
    }
    return true;
  });

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllFiltered = () => {
    const ids = new Set(selectedIds);
    filtered.forEach((q) => ids.add(q.id));
    setSelectedIds(ids);
  };

  const deselectAll = () => setSelectedIds(new Set());

  const selectAllOpen = () => {
    const ids = new Set(selectedIds);
    queries.filter((q) => q.status === "open").forEach((q) => ids.add(q.id));
    setSelectedIds(ids);
  };

  const selectAllResolved = () => {
    const ids = new Set(selectedIds);
    queries
      .filter((q) => q.status === "resolved")
      .forEach((q) => ids.add(q.id));
    setSelectedIds(ids);
  };

  const handleGenerate = () => {
    if (selectedIds.size === 0) {
      alert("Select at least one query.");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      addReport({
        id: crypto.randomUUID(),
        projectName: reportName || "Site Intelligence Report",
        date: new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString(),
        itemCount: selectedIds.size,
        items: observations.filter((o) => selectedIds.has(o.id)),
      });
      setGenerating(false);
      window.location.href = "/user/sa-reports";
    }, 1500);
  };

  const selectedOpen = Array.from(selectedIds).filter(
    (id) => queries.find((q) => q.id === id)?.status === "open",
  ).length;
  const selectedResolved = Array.from(selectedIds).filter(
    (id) => queries.find((q) => q.id === id)?.status === "resolved",
  ).length;

  return (
    <EdifiShell system="site-agent" activeNav="reports" section="user">
      <div className="animate-in fade-in">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FileText size={22} /> Generate Report
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Select site queries and updates to include in a comprehensive AI-generated report.
        </p>

        {/* Report Name */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Report Name
          </p>
          <input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="e.g., Monthly Site Intelligence Report - May 2026"
            className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Selection Summary */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{selectedIds.size}</span>
              <div>
                <p className="text-sm font-medium">items selected</p>
                <p className="text-xs text-gray-400">
                  {selectedOpen} open · {selectedResolved} resolved
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={selectAllOpen}
                className="text-xs px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full font-bold hover:bg-amber-100 transition-colors border border-amber-100"
              >
                Select All Open
              </button>
              <button
                onClick={selectAllResolved}
                className="text-xs px-3 py-1.5 bg-green-50 text-green-600 rounded-full font-bold hover:bg-green-100 transition-colors border border-green-100"
              >
                Select All Resolved
              </button>
              <button
                onClick={selectAllFiltered}
                className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                Select Visible
              </button>
              <button
                onClick={deselectAll}
                className="text-xs px-3 py-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search queries..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "all" | "open" | "resolved")
            }
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Query List */}
        <div
          className="border border-gray-100 rounded-2xl overflow-hidden mb-6"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 size={20} className="animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">
              No queries match your filters.
            </p>
          ) : (
            filtered.map((q) => (
              <div
                key={q.id}
                onClick={() => toggle(q.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 ${
                  selectedIds.has(q.id) ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                    selectedIds.has(q.id) ? "bg-black" : "border-2 border-gray-200"
                  }`}
                >
                  {selectedIds.has(q.id) && (
                    <CheckSquare size={12} className="text-white" />
                  )}
                </div>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    q.status === "open" ? "bg-amber-400" : "bg-green-400"
                  }`}
                />
                <p className="text-sm flex-1 truncate">
                  {q.description || "No description"}
                </p>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {q.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    q.status === "open"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {q.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Additional Notes */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Additional Notes for AI
          </p>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Add any specific instructions, focus areas, or context for the AI report generator..."
            className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 resize-none h-24"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating || selectedIds.size === 0}
          className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:opacity-90 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
        >
          {generating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Zap size={16} />
          )}
          {generating
            ? "Generating Report with AI..."
            : `Generate Report (${selectedIds.size} items)`}
        </button>
      </div>
    </EdifiShell>
  );
}
