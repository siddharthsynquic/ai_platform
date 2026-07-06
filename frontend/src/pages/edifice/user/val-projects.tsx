import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

type StatusFilter = "all" | "active" | "review" | "complete";

export function ValProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const tiles: Array<{
    key: string;
    status: "active" | "review" | "complete";
    stagger: string;
    iconBg: string;
    iconColor: string;
    dotColor: string;
    statusLabel: string;
    title: string;
    desc: string;
    stageBar: React.CSSProperties[];
    drawings: number;
    validated: number;
    validatedColor: string;
    flagged: number;
    flaggedColor: string;
  }> = [
    {
      key: "tower-a",
      status: "active",
      stagger: "stagger-1",
      iconBg: "var(--color-green-50)",
      iconColor: "var(--color-green-600)",
      dotColor: "var(--color-green-500)",
      statusLabel: "Active",
      title: "Tower A — Marina Bay",
      desc: "Mixed-use residential tower. 42 floors. GFC stage in progress with active validation cycles.",
      stageBar: [
        { background: "var(--color-green-400)" },
        { background: "var(--color-amber-400)" },
        { background: "var(--color-gray-200)" },
      ],
      drawings: 247,
      validated: 189,
      validatedColor: "var(--color-green-600)",
      flagged: 42,
      flaggedColor: "var(--color-amber-600)",
    },
    {
      key: "mall-c",
      status: "active",
      stagger: "stagger-2",
      iconBg: "var(--color-amber-50)",
      iconColor: "var(--color-amber-600)",
      dotColor: "var(--color-amber-400)",
      statusLabel: "Active",
      title: "Mall Block C",
      desc: "Retail podium structure. DD stage validation with MEP coordination review pending.",
      stageBar: [
        { background: "var(--color-green-400)" },
        { background: "var(--color-amber-300)", opacity: 0.5 },
        { background: "var(--color-gray-200)" },
      ],
      drawings: 124,
      validated: 98,
      validatedColor: "var(--color-green-600)",
      flagged: 18,
      flaggedColor: "var(--color-amber-600)",
    },
    {
      key: "residences-2",
      status: "review",
      stagger: "stagger-3",
      iconBg: "var(--color-blue-50)",
      iconColor: "var(--color-blue-600)",
      dotColor: "var(--color-blue-400)",
      statusLabel: "In Review",
      title: "Residences Phase 2",
      desc: "Luxury low-rise villas. SD stage drawings under initial review. 6 villa typologies.",
      stageBar: [
        { background: "var(--color-blue-400)", opacity: 0.5 },
        { background: "var(--color-gray-200)" },
        { background: "var(--color-gray-200)" },
      ],
      drawings: 86,
      validated: 34,
      validatedColor: "var(--color-green-600)",
      flagged: 12,
      flaggedColor: "var(--color-red-500)",
    },
    {
      key: "office-tower-east",
      status: "active",
      stagger: "stagger-4",
      iconBg: "var(--color-purple-50)",
      iconColor: "var(--color-purple-600)",
      dotColor: "var(--color-purple-400)",
      statusLabel: "Active",
      title: "Office Tower East",
      desc: "Commercial office development. 28 floors with full GFC package. Facade validation in progress.",
      stageBar: [
        { background: "var(--color-green-400)" },
        { background: "var(--color-green-400)" },
        { background: "var(--color-purple-400)", opacity: 0.6 },
      ],
      drawings: 312,
      validated: 278,
      validatedColor: "var(--color-green-600)",
      flagged: 24,
      flaggedColor: "var(--color-amber-600)",
    },
    {
      key: "community-centre",
      status: "complete",
      stagger: "stagger-5",
      iconBg: "var(--color-gray-100)",
      iconColor: "var(--color-gray-500)",
      dotColor: "var(--color-gray-400)",
      statusLabel: "Complete",
      title: "Community Centre",
      desc: "Public facility. All 3 stages validated and archived. 100% validation coverage achieved.",
      stageBar: [
        { background: "var(--color-green-400)" },
        { background: "var(--color-green-400)" },
        { background: "var(--color-green-400)" },
      ],
      drawings: 64,
      validated: 64,
      validatedColor: "var(--color-green-600)",
      flagged: 0,
      flaggedColor: "",
    },
    {
      key: "hotel-apts",
      status: "review",
      stagger: "stagger-5",
      iconBg: "var(--color-cyan-50)",
      iconColor: "var(--color-cyan-500)",
      dotColor: "var(--color-cyan-500)",
      statusLabel: "In Review",
      title: "Hotel & Serviced Apts",
      desc: "Hospitality project. DD stage started. Interior fit-out drawings pending initial scan.",
      stageBar: [
        { background: "var(--color-green-400)" },
        { background: "var(--color-cyan-400)", opacity: 0.4 },
        { background: "var(--color-gray-200)" },
      ],
      drawings: 156,
      validated: 45,
      validatedColor: "var(--color-green-600)",
      flagged: 8,
      flaggedColor: "var(--color-amber-600)",
    },
  ];

  const q = search.toLowerCase();
  const filtered = tiles.filter((t) => {
    const matchesSearch = q === "" || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
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
    .project-stage-bar { display: flex; gap: 3px; margin-top: var(--space-3); }
    .project-stage-segment { height: 4px; border-radius: 2px; flex: 1; }
  `}</style>
      <EdifiShell system="validation" activeNav="dashboard" section="user">
        {/* Cover Hero */}
        <div className="cover-hero">
          <div className="badge badge-dark mb-4" style={{ display: "inline-flex", gap: "6px" }}>
            <EdIcon name="layers" size={12} />
            Drawing Validation Engine
          </div>
          <h1>Select a Project</h1>
          <p>Choose a project to run drawing validations, review flagged issues, and track stage progression.</p>
        </div>

        {/* Toolbar */}
        <div className="cover-toolbar">
          <div className="search-box">
            <EdIcon name="search" size={14} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="filter-pills">
              <button className={`filter-pill ${statusFilter === "all" ? "active" : ""}`} onClick={() => setStatusFilter("all")}>All</button>
              <button className={`filter-pill ${statusFilter === "active" ? "active" : ""}`} onClick={() => setStatusFilter("active")}>Active</button>
              <button className={`filter-pill ${statusFilter === "review" ? "active" : ""}`} onClick={() => setStatusFilter("review")}>In Review</button>
              <button className={`filter-pill ${statusFilter === "complete" ? "active" : ""}`} onClick={() => setStatusFilter("complete")}>Complete</button>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="project-grid" id="projectGrid">
          {filtered.map((t) => (
            <div
              key={t.key}
              className={`project-tile animate-in ${t.stagger}`}
              data-status={t.status}
              onClick={() => (window.location.href = "/user/val-dashboard")}
            >
              <div className="project-tile-header">
                <div className="project-tile-icon" style={{ background: t.iconBg, color: t.iconColor }}>
                  <EdIcon name="building" size={18} />
                </div>
                <div className="project-status">
                  <span className="dot" style={{ background: t.dotColor }}></span>
                  {t.statusLabel}
                </div>
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="project-stage-bar">
                {t.stageBar.map((seg, i) => (
                  <div key={i} className="project-stage-segment" style={seg}></div>
                ))}
              </div>
              <div className="project-tile-stats">
                <div className="project-tile-stat">
                  <div className="value">{t.drawings}</div>
                  <div className="label">Drawings</div>
                </div>
                <div className="project-tile-stat">
                  <div className="value" style={{ color: t.validatedColor }}>{t.validated}</div>
                  <div className="label">Validated</div>
                </div>
                <div className="project-tile-stat">
                  <div className="value" style={t.flaggedColor ? { color: t.flaggedColor } : undefined}>{t.flagged}</div>
                  <div className="label">Flagged</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EdifiShell>
    </>
  );
}
