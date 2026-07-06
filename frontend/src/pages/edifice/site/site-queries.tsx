import { EdIcon } from "@/shared/icons/edifice-icons";
import { useState } from "react";

export function SiteQueriesPage() {
  const [activeFilter, setActiveFilter] = useState("All (20)");
  const filters = ["All (20)", "Open (5)", "Waiting (3)", "Resolved (12)"];

  return (
    <>
      <style>{`
        body { background: var(--color-gray-50); }
        .site-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; background: white; }
        .site-header { padding: 16px 20px; background: var(--color-black); color: white; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .site-content { flex: 1; padding: 20px; }
        .filter-row { display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 4px; }
        .filter-chip { padding: 6px 14px; font-size: 0.6875rem; font-weight: 600; border-radius: var(--radius-full); border: 1px solid var(--color-gray-200); white-space: nowrap; cursor: pointer; transition: all 0.15s; background: white; }
        .filter-chip:hover, .filter-chip.active { background: var(--color-black); color: white; border-color: var(--color-black); }
        .query-item { display: flex; gap: 12px; padding: 14px; border: 1px solid var(--color-gray-100); border-radius: var(--radius-xl); margin-bottom: 10px; cursor: pointer; transition: all 0.15s; background: white; text-decoration: none; color: inherit; }
        .query-item:hover { border-color: var(--color-gray-300); box-shadow: var(--shadow-sm); }
        .qi-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .site-bottom-nav { position: sticky; bottom: 0; background: white; border-top: 1px solid var(--color-gray-100); display: flex; z-index: 50; }
        .site-nav-item { flex: 1; text-align: center; padding: 10px 0 8px; font-size: 0.625rem; font-weight: 600; color: var(--color-gray-400); display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; text-decoration: none; }
        .site-nav-item:hover, .site-nav-item.active { color: var(--color-black); }
      `}</style>
      <div className="site-shell">
        <header className="site-header">
          <div style={{ fontSize: "0.9375rem", fontWeight: 700 }}>My Queries</div>
          <span style={{ fontSize: "0.625rem", color: "rgba(255,255,255,0.4)" }}>20 total</span>
        </header>
        <div className="site-content">
          <div className="filter-row">
            {filters.map((f) => (
              <span
                key={f}
                className={`filter-chip${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </span>
            ))}
          </div>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-red-500)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>Waterproofing breach — parapet</strong><span className="badge severity-critical" style={{ fontSize: "0.5rem" }}>Critical</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 12, Zone A · 14 min ago</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 2</span><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📍</span><span className="badge badge-red" style={{ fontSize: "0.5rem" }}>Open</span></div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-amber-400)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>Rebar spacing mismatch</strong><span className="badge severity-major" style={{ fontSize: "0.5rem" }}>Major</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 7, Core B · 42 min ago</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 3</span><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📍</span><span className="badge badge-amber" style={{ fontSize: "0.5rem" }}>Office Reviewing</span></div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-red-500)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>HVAC duct clearance query</strong><span className="badge severity-minor" style={{ fontSize: "0.5rem" }}>Minor</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 9, Zone C · 2 hrs ago</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 4</span><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>🎤</span><span className="badge badge-red" style={{ fontSize: "0.5rem" }}>Open</span></div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-amber-400)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>Fire damper not installed</strong><span className="badge severity-critical" style={{ fontSize: "0.5rem" }}>Critical</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 4, Core A · 5 hrs ago</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 1</span><span className="badge badge-amber" style={{ fontSize: "0.5rem" }}>Office Reviewing</span></div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-green-500)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>Facade panel alignment</strong><span className="badge severity-minor" style={{ fontSize: "0.5rem" }}>Minor</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Elevation East · 1 hr ago</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 6</span><span className="badge badge-green" style={{ fontSize: "0.5rem" }}>✓ Resolved</span></div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-green-500)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>Plumbing drainage slope</strong><span className="badge severity-observation" style={{ fontSize: "0.5rem" }}>Observation</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 3, Washroom · Yesterday</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>🎤</span><span className="badge badge-green" style={{ fontSize: "0.5rem" }}>✓ Resolved</span></div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-item">
            <div className="qi-dot" style={{ background: "var(--color-amber-400)" }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between"><strong style={{ fontSize: "0.8125rem" }}>Electrical conduit spacing</strong><span className="badge severity-major" style={{ fontSize: "0.5rem" }}>Major</span></div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 7, Zone A · Jun 20</p>
              <div className="flex gap-1 mt-1"><span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 2</span><span className="badge badge-amber" style={{ fontSize: "0.5rem" }}>Office Reviewing</span></div>
            </div>
          </a>

          <div style={{ height: "60px" }}></div>
        </div>
        <nav className="site-bottom-nav">
          <a href="/site/site-home" className="site-nav-item"><EdIcon name="home" size={20} />Home</a>
          <a href="/site/site-queries" className="site-nav-item active"><EdIcon name="database" size={20} />Queries</a>
          <a href="/site/site-new-query" className="site-nav-item"><EdIcon name="plus" size={20} />Log New</a>
          <a href="/site/site-updates" className="site-nav-item"><EdIcon name="messageSquare" size={20} />Updates</a>
        </nav>
      </div>
    </>
  );
}
