import { EdIcon } from "@/shared/icons/edifice-icons";

export function SiteHomePage() {
  return (
    <>
      <style>{`
        body { background: var(--color-gray-50); }
        .site-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; background: white; }
        .site-header { padding: 16px 20px; background: var(--color-black); color: white; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .site-header .brand-title { font-size: 0.9375rem; font-weight: 700; }
        .site-header .brand-sub { font-size: 0.5625rem; color: rgba(255,255,255,0.5); letter-spacing: 0.05em; text-transform: uppercase; }
        .site-content { flex: 1; padding: 20px; }
        .site-bottom-nav { position: sticky; bottom: 0; background: white; border-top: 1px solid var(--color-gray-100); display: flex; z-index: 50; }
        .site-nav-item { flex: 1; text-align: center; padding: 10px 0 8px; font-size: 0.625rem; font-weight: 600; color: var(--color-gray-400); display: flex; flex-direction: column; align-items: center; gap: 3px; transition: color 0.15s; cursor: pointer; text-decoration: none; }
        .site-nav-item:hover, .site-nav-item.active { color: var(--color-black); }
        .site-nav-item svg { width: 20px; height: 20px; }
        .query-card { border: 1px solid var(--color-gray-100); border-radius: var(--radius-xl); padding: 14px; margin-bottom: 10px; cursor: pointer; transition: all 0.2s; background: white; }
        .query-card:hover { border-color: var(--color-gray-300); box-shadow: var(--shadow-sm); }
        .quick-stat { background: var(--color-gray-50); border-radius: var(--radius-xl); padding: 16px; text-align: center; }
        .quick-stat .value { font-size: 1.5rem; font-weight: 700; }
        .quick-stat .label { font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-gray-400); margin-top: 2px; }
        .fab { position: fixed; bottom: 70px; right: calc(50% - 220px); width: 56px; height: 56px; border-radius: 50%; background: var(--color-black); color: white; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-2xl); z-index: 60; transition: transform 0.2s; }
        .fab:hover { transform: scale(1.08); }
        @media (max-width: 480px) { .fab { right: 20px; } }
      `}</style>
      <div className="site-shell">
        {/* Header */}
        <header className="site-header">
          <div>
            <div className="brand-title">Edifice AI</div>
            <div className="brand-sub">Site Team</div>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)" }}>Tower A</span>
            <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.15)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <EdIcon name="users" size={14} />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="site-content">
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "2px" }}>Good afternoon</h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-400)" }}>Site Team 1 · Floor 7-12</p>
          </div>

          {/* Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
            <div className="quick-stat">
              <div className="value" style={{ color: "var(--color-red-500)" }}>5</div>
              <div className="label">Open</div>
            </div>
            <div className="quick-stat">
              <div className="value" style={{ color: "var(--color-amber-500)" }}>3</div>
              <div className="label">Waiting</div>
            </div>
            <div className="quick-stat">
              <div className="value" style={{ color: "var(--color-green-600)" }}>12</div>
              <div className="label">Resolved</div>
            </div>
          </div>

          {/* Recent Queries */}
          <div style={{ marginBottom: "12px" }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-gray-400)" }}>My Active Queries</span>
              <a href="/site/site-queries" style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-gray-400)" }}>View All →</a>
            </div>
          </div>

          <a href="/site/site-query-detail" className="query-card" style={{ display: "block", borderLeft: "3px solid var(--color-red-500)" }}>
            <div className="flex items-center justify-between mb-1">
              <strong style={{ fontSize: "0.8125rem" }}>Waterproofing breach — parapet</strong>
              <span className="badge severity-critical" style={{ fontSize: "0.5625rem" }}>Critical</span>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)", marginBottom: "6px" }}>Floor 12, Zone A · 14 min ago</p>
            <div className="flex items-center gap-2">
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>📸 2</span>
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>📍 Pinned</span>
              <span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>Open</span>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-card" style={{ display: "block", borderLeft: "3px solid var(--color-amber-400)" }}>
            <div className="flex items-center justify-between mb-1">
              <strong style={{ fontSize: "0.8125rem" }}>Rebar spacing mismatch</strong>
              <span className="badge severity-major" style={{ fontSize: "0.5625rem" }}>Major</span>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)", marginBottom: "6px" }}>Floor 7, Core B · 42 min ago</p>
            <div className="flex items-center gap-2">
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>📸 3</span>
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>📍 Pinned</span>
              <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>Office Reviewing</span>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-card" style={{ display: "block", borderLeft: "3px solid var(--color-blue-400)" }}>
            <div className="flex items-center justify-between mb-1">
              <strong style={{ fontSize: "0.8125rem" }}>HVAC duct clearance query</strong>
              <span className="badge severity-minor" style={{ fontSize: "0.5625rem" }}>Minor</span>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)", marginBottom: "6px" }}>Floor 9, Zone C · 2 hrs ago</p>
            <div className="flex items-center gap-2">
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>📸 4</span>
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>🎤 Voice</span>
              <span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>Open</span>
            </div>
          </a>

          <a href="/site/site-query-detail" className="query-card" style={{ display: "block", borderLeft: "3px solid var(--color-green-500)" }}>
            <div className="flex items-center justify-between mb-1">
              <strong style={{ fontSize: "0.8125rem" }}>Facade panel alignment</strong>
              <span className="badge severity-minor" style={{ fontSize: "0.5625rem" }}>Minor</span>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)", marginBottom: "6px" }}>Elevation East · 1 hr ago</p>
            <div className="flex items-center gap-2">
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>📸 6</span>
              <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>✓ Resolved</span>
            </div>
          </a>

          {/* Office Replies Section */}
          <div style={{ margin: "20px 0 12px" }}>
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-gray-400)" }}>Office Replies</span>
          </div>

          <div className="query-card" style={{ background: "var(--color-blue-50)", borderColor: "var(--color-blue-100)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div style={{ width: "24px", height: "24px", background: "var(--color-blue-500)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.5rem", fontWeight: 700 }}>RS</div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Ar. Sharma replied</span>
              <span style={{ fontSize: "0.625rem", color: "var(--color-gray-400)", marginLeft: "auto" }}>10 min ago</span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)" }}>"Stop work on parapet area. Contractor X has been notified. Please take additional photos from the east corner."</p>
            <p style={{ fontSize: "0.625rem", color: "var(--color-blue-500)", marginTop: "4px" }}>Re: Waterproofing breach — parapet</p>
          </div>
        </div>

        {/* FAB */}
        <a href="/site/site-new-query" className="fab">
          <EdIcon name="plus" size={24} />
        </a>

        {/* Bottom Nav */}
        <nav className="site-bottom-nav">
          <a href="/site/site-home" className="site-nav-item active">
            <EdIcon name="home" size={20} />
            Home
          </a>
          <a href="/site/site-queries" className="site-nav-item">
            <EdIcon name="database" size={20} />
            Queries
          </a>
          <a href="/site/site-new-query" className="site-nav-item">
            <EdIcon name="plus" size={20} />
            Log New
          </a>
          <a href="/site/site-updates" className="site-nav-item">
            <EdIcon name="messageSquare" size={20} />
            Updates
          </a>
        </nav>
      </div>
    </>
  );
}
