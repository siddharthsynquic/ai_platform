import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

type ProjectStatus = "active" | "on-hold" | "complete";
type StatusFilter = "all" | ProjectStatus;

interface Project {
  status: ProjectStatus;
  stagger: number;
  iconBg: string;
  iconColor: string;
  dotColor: string;
  statusLabel: string;
  title: string;
  desc: string;
  observations: string;
  openQueries: string;
  resolved: string;
}

const PROJECTS: Project[] = [
  {
    status: "active", stagger: 1,
    iconBg: "var(--color-green-50)", iconColor: "var(--color-green-600)",
    dotColor: "var(--color-green-500)", statusLabel: "Active",
    title: "Tower A — Marina Bay",
    desc: "42-storey mixed-use tower. Structural and MEP works in progress. Floors 7-24 active.",
    observations: "156", openQueries: "12", resolved: "94%",
  },
  {
    status: "active", stagger: 2,
    iconBg: "var(--color-amber-50)", iconColor: "var(--color-amber-600)",
    dotColor: "var(--color-amber-400)", statusLabel: "Active",
    title: "Mall Block C",
    desc: "Retail podium. Finishing works ongoing. Facade and interior trades running concurrently.",
    observations: "89", openQueries: "5", resolved: "87%",
  },
  {
    status: "active", stagger: 3,
    iconBg: "var(--color-blue-50)", iconColor: "var(--color-blue-600)",
    dotColor: "var(--color-blue-400)", statusLabel: "Active",
    title: "Residences Phase 2",
    desc: "6 villa typologies under construction. Foundation and structural framing stage.",
    observations: "42", openQueries: "3", resolved: "91%",
  },
  {
    status: "on-hold", stagger: 4,
    iconBg: "var(--color-red-50)", iconColor: "var(--color-red-500)",
    dotColor: "var(--color-red-400)", statusLabel: "On Hold",
    title: "Office Tower East",
    desc: "Construction paused — pending design revision for floors 20-28. Site secured.",
    observations: "203", openQueries: "0", resolved: "100%",
  },
  {
    status: "complete", stagger: 5,
    iconBg: "var(--color-gray-100)", iconColor: "var(--color-gray-500)",
    dotColor: "var(--color-gray-400)", statusLabel: "Complete",
    title: "Community Centre",
    desc: "Handed over. All snag lists closed. Site reports archived for reference.",
    observations: "78", openQueries: "0", resolved: "100%",
  },
  {
    status: "active", stagger: 5,
    iconBg: "var(--color-cyan-50)", iconColor: "var(--color-cyan-500)",
    dotColor: "var(--color-cyan-500)", statusLabel: "Active",
    title: "Hotel & Serviced Apts",
    desc: "Hospitality project. Structural works complete, MEP rough-ins underway on lower floors.",
    observations: "67", openQueries: "8", resolved: "82%",
  },
];

export function SaProjectsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "on-hold", label: "On Hold" },
    { key: "complete", label: "Complete" },
  ];

  const q = query.toLowerCase();
  const visible = PROJECTS.filter((p) => {
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <style>{`
    .cover-hero {
      text-align: center;
      padding: var(--space-12) var(--space-4) var(--space-8);
    }
    .cover-hero h1 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: var(--space-2);
    }
    .cover-hero p {
      color: var(--color-gray-400);
      font-size: 0.9375rem;
      max-width: 520px;
      margin: 0 auto;
    }
    .cover-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-6);
      flex-wrap: wrap;
      gap: var(--space-3);
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      background: var(--color-gray-50);
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-xl);
      width: 280px;
    }
    .search-box input {
      border: none;
      background: none;
      font-size: 0.8125rem;
      outline: none;
      flex: 1;
      color: var(--color-black);
    }
    .search-box svg {
      width: 14px; height: 14px;
      color: var(--color-gray-300);
    }
    .filter-pills {
      display: flex;
      gap: 6px;
    }
    .filter-pill {
      padding: 5px 14px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: var(--radius-full);
      border: 1px solid var(--color-gray-200);
      color: var(--color-gray-500);
      cursor: pointer;
      transition: all 0.15s;
    }
    .filter-pill:hover { border-color: var(--color-gray-400); color: var(--color-black); }
    .filter-pill.active { background: var(--color-black); color: white; border-color: var(--color-black); }
    .project-status { display: flex; align-items: center; gap: 6px; font-size: 0.6875rem; font-weight: 600; }
    .project-status .dot { width: 6px; height: 6px; border-radius: 50%; }
  `}</style>
      <EdifiShell system="site-agent" activeNav="dashboard" section="user">
        {/* Cover Hero */}
        <div className="cover-hero">
          <div className="badge badge-dark mb-4" style={{ display: "inline-flex", gap: "6px" }}>
            <EdIcon name="camera" size={12} />
            Site Agent Intelligence
          </div>
          <h1>Select a Project</h1>
          <p>Choose a construction project to capture observations, manage site queries, and generate progress reports.</p>
        </div>

        {/* Toolbar */}
        <div className="cover-toolbar">
          <div className="search-box">
            <EdIcon name="search" size={14} />
            <input
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="filter-pills">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`filter-pill${statusFilter === f.key ? " active" : ""}`}
                  onClick={() => setStatusFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="project-grid" id="projectGrid">
          {visible.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className={`project-tile animate-in stagger-${p.stagger}`}
              data-status={p.status}
              onClick={() => (window.location.href = "/user/sa-dashboard")}
            >
              <div className="project-tile-header">
                <div className="project-tile-icon" style={{ background: p.iconBg, color: p.iconColor }}>
                  <EdIcon name="building" size={18} />
                </div>
                <div className="project-status">
                  <span className="dot" style={{ background: p.dotColor }}></span>
                  {p.statusLabel}
                </div>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tile-stats">
                <div className="project-tile-stat">
                  <div className="value">{p.observations}</div>
                  <div className="label">Observations</div>
                </div>
                <div className="project-tile-stat">
                  <div className="value" style={{ color: "var(--color-red-500)" }}>{p.openQueries}</div>
                  <div className="label">Open Queries</div>
                </div>
                <div className="project-tile-stat">
                  <div className="value" style={{ color: "var(--color-green-600)" }}>{p.resolved}</div>
                  <div className="label">Resolved</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EdifiShell>
    </>
  );
}
