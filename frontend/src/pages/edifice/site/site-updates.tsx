import { EdIcon } from "@/shared/icons/edifice-icons";

export function SiteUpdatesPage() {
  return (
    <>
      <style>{`
        body { background: var(--color-gray-50); }
        .site-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; background: white; }
        .site-header { padding: 16px 20px; background: var(--color-black); color: white; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .site-content { flex: 1; padding: 0; }
        .update-item { padding: 16px 20px; border-bottom: 1px solid var(--color-gray-100); cursor: pointer; transition: background 0.15s; display: block; text-decoration: none; color: inherit; }
        .update-item:hover { background: var(--color-gray-50); }
        .update-item.unread { background: var(--color-blue-50); border-left: 3px solid var(--color-blue-500); }
        .update-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.5625rem; font-weight: 700; color: white; flex-shrink: 0; }
        .site-bottom-nav { position: sticky; bottom: 0; background: white; border-top: 1px solid var(--color-gray-100); display: flex; z-index: 50; }
        .site-nav-item { flex: 1; text-align: center; padding: 10px 0 8px; font-size: 0.625rem; font-weight: 600; color: var(--color-gray-400); display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; text-decoration: none; }
        .site-nav-item:hover, .site-nav-item.active { color: var(--color-black); }
        .notif-dot { position: relative; }
        .notif-dot::after { content: '2'; position: absolute; top: -4px; right: -8px; width: 14px; height: 14px; background: var(--color-red-500); border-radius: 50%; font-size: 0.5rem; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; }
      `}</style>
      <div className="site-shell">
        <header className="site-header">
          <div style={{ fontSize: "0.9375rem", fontWeight: 700 }}>Updates</div>
          <button style={{ fontSize: "0.625rem", color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer" }}>Mark all read</button>
        </header>
        <div className="site-content">
          {/* Today */}
          <div style={{ padding: "10px 20px", fontSize: "0.5625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-gray-400)", background: "var(--color-gray-50)" }}>Today</div>

          <a href="/site/site-query-detail" className="update-item unread">
            <div className="flex items-center gap-3">
              <div className="update-avatar" style={{ background: "var(--color-blue-500)" }}>RS</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Ar. Sharma replied to your query</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>"Stop work on parapet area immediately..."</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--color-blue-500)", marginTop: "2px" }}>Waterproofing breach — parapet · 10 min ago</p>
              </div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="update-item unread">
            <div className="flex items-center gap-3">
              <div className="update-avatar" style={{ background: "var(--color-purple-500)" }}>SK</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Ar. Khan assigned Contractor X</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Query has been assigned for remediation.</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--color-blue-500)", marginTop: "2px" }}>Waterproofing breach — parapet · 8 min ago</p>
              </div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="update-item">
            <div className="flex items-center gap-3">
              <div className="update-avatar" style={{ background: "var(--color-amber-500)" }}>RS</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Status changed to "Office Reviewing"</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Rebar spacing mismatch is being reviewed.</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginTop: "2px" }}>Rebar spacing mismatch · 30 min ago</p>
              </div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="update-item">
            <div className="flex items-center gap-3">
              <div className="update-avatar" style={{ background: "var(--color-green-500)" }}>VP</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Query resolved ✓</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Facade panel alignment corrected and verified.</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginTop: "2px" }}>Facade panel alignment · 1 hr ago</p>
              </div>
            </div>
          </a>

          {/* Yesterday */}
          <div style={{ padding: "10px 20px", fontSize: "0.5625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-gray-400)", background: "var(--color-gray-50)" }}>Yesterday</div>

          <a href="/site/site-query-detail" className="update-item">
            <div className="flex items-center gap-3">
              <div className="update-avatar" style={{ background: "var(--color-blue-500)" }}>RS</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Ar. Sharma replied</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>"Refer SD-STAIR-007 for correct spacing."</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginTop: "2px" }}>Staircase rebar detail · Yesterday</p>
              </div>
            </div>
          </a>

          <a href="/site/site-query-detail" className="update-item">
            <div className="flex items-center gap-3">
              <div className="update-avatar" style={{ background: "var(--color-green-500)" }}>VP</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Query resolved ✓</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Plumbing drainage slope corrected.</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginTop: "2px" }}>Drainage slope · Yesterday</p>
              </div>
            </div>
          </a>

          <div style={{ height: "60px" }}></div>
        </div>
        <nav className="site-bottom-nav">
          <a href="/site/site-home" className="site-nav-item"><EdIcon name="home" size={20} />Home</a>
          <a href="/site/site-queries" className="site-nav-item"><EdIcon name="database" size={20} />Queries</a>
          <a href="/site/site-new-query" className="site-nav-item"><EdIcon name="plus" size={20} />Log New</a>
          <a href="/site/site-updates" className="site-nav-item active">
            <span className="notif-dot"><EdIcon name="messageSquare" size={20} /></span>
            Updates
          </a>
        </nav>
      </div>
    </>
  );
}
