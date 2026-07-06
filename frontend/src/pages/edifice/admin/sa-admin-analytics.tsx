import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaAdminAnalyticsPage() {
  return (
    <>
      <style>{`
    .chart-placeholder { background: var(--color-gray-50); border: 1px solid var(--color-gray-100); border-radius: var(--radius-2xl); padding: 2rem; text-align: center; color: var(--color-gray-400); }
    .bar-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .bar-label { width: 120px; font-size: 0.75rem; text-align: right; flex-shrink: 0; }
    .bar-track { flex: 1; height: 24px; background: var(--color-gray-50); border-radius: var(--radius-lg); overflow: hidden; position: relative; }
    .bar-fill { height: 100%; border-radius: var(--radius-lg); display: flex; align-items: center; padding-left: 10px; font-size: 0.6875rem; font-weight: 700; color: white; transition: width 1s var(--ease-out); }
      `}</style>
      <EdifiShell system="site-agent" activeNav="analytics" section="admin">
        <div className="page-header">
          <h1>Analytics</h1>
          <p>Deep-dive into observation trends, resolution times, and team performance metrics.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid-4 mb-8" style={{ gap: "1rem" }}>
          <div className="card p-5 text-center"><div style={{ fontSize: "2rem", fontWeight: 700 }}>4.2</div><p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Avg. Days to Resolve</p><p style={{ fontSize: "0.625rem", color: "var(--color-green-500)" }}>↓ 1.3 from last month</p></div>
          <div className="card p-5 text-center"><div style={{ fontSize: "2rem", fontWeight: 700 }}>34</div><p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Avg. Daily Observations</p><p style={{ fontSize: "0.625rem", color: "var(--color-blue-600)" }}>↑ 8% this week</p></div>
          <div className="card p-5 text-center"><div style={{ fontSize: "2rem", fontWeight: 700 }}>91%</div><p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>AI Tag Accuracy</p><p style={{ fontSize: "0.625rem", color: "var(--color-green-500)" }}>Calibrated Jun 20</p></div>
          <div className="card p-5 text-center"><div style={{ fontSize: "2rem", fontWeight: 700 }}>2.1</div><p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Avg. Photos per Obs.</p><p style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>Stable</p></div>
        </div>

        <div className="grid-2 mb-8" style={{ gap: "1.5rem" }}>
          {/* By Trade */}
          <div className="card p-6">
            <span className="section-title mb-4" style={{ display: "block" }}>Observations by Trade</span>
            <div className="bar-row"><div className="bar-label">Structural</div><div className="bar-track"><div className="bar-fill" style={{ width: "100%", background: "var(--color-red-400)" }}>312</div></div></div>
            <div className="bar-row"><div className="bar-label">MEP</div><div className="bar-track"><div className="bar-fill" style={{ width: "82%", background: "var(--color-amber-400)" }}>256</div></div></div>
            <div className="bar-row"><div className="bar-label">Facade</div><div className="bar-track"><div className="bar-fill" style={{ width: "63%", background: "#6366f1" }}>198</div></div></div>
            <div className="bar-row"><div className="bar-label">Finishing</div><div className="bar-track"><div className="bar-fill" style={{ width: "53%", background: "#06b6d4" }}>167</div></div></div>
            <div className="bar-row"><div className="bar-label">Compliance</div><div className="bar-track"><div className="bar-fill" style={{ width: "28%", background: "var(--color-green-400)" }}>89</div></div></div>
            <div className="bar-row"><div className="bar-label">Material</div><div className="bar-track"><div className="bar-fill" style={{ width: "21%", background: "var(--color-gray-400)" }}>67</div></div></div>
          </div>

          {/* By Floor */}
          <div className="card p-6">
            <span className="section-title mb-4" style={{ display: "block" }}>Hot Floors — Most Observations</span>
            <div className="bar-row"><div className="bar-label">Floor 7</div><div className="bar-track"><div className="bar-fill" style={{ width: "100%", background: "var(--color-red-400)" }}>142</div></div></div>
            <div className="bar-row"><div className="bar-label">Floor 12</div><div className="bar-track"><div className="bar-fill" style={{ width: "85%", background: "var(--color-red-400)" }}>121</div></div></div>
            <div className="bar-row"><div className="bar-label">Floor 9</div><div className="bar-track"><div className="bar-fill" style={{ width: "72%", background: "var(--color-amber-400)" }}>102</div></div></div>
            <div className="bar-row"><div className="bar-label">Floor 4</div><div className="bar-track"><div className="bar-fill" style={{ width: "62%", background: "var(--color-amber-400)" }}>88</div></div></div>
            <div className="bar-row"><div className="bar-label">Terrace</div><div className="bar-track"><div className="bar-fill" style={{ width: "53%", background: "#6366f1" }}>75</div></div></div>
            <div className="bar-row"><div className="bar-label">Basement</div><div className="bar-track"><div className="bar-fill" style={{ width: "35%", background: "var(--color-gray-400)" }}>49</div></div></div>
          </div>
        </div>

        {/* Resolution Trend */}
        <div className="card p-6 mb-8">
          <span className="section-title mb-3" style={{ display: "block" }}>Weekly Trend — Observations vs Resolutions</span>
          <div className="chart-placeholder" style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div>
              <span style={{ margin: "0 auto 0.75rem", display: "block" }}><EdIcon name="trendingUp" size={36} /></span>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem" }}>Interactive Chart</p>
              <p style={{ fontSize: "0.75rem" }}>Chart.js / D3 visualization would render here in production</p>
              <div className="flex justify-center gap-6 mt-4" style={{ fontSize: "0.75rem" }}>
                <span>Wk 22: <strong>156 new</strong> / <strong style={{ color: "var(--color-green-600)" }}>89 resolved</strong></span>
                <span>Wk 23: <strong>142 new</strong> / <strong style={{ color: "var(--color-green-600)" }}>112 resolved</strong></span>
                <span>Wk 24: <strong>168 new</strong> / <strong style={{ color: "var(--color-green-600)" }}>97 resolved</strong></span>
                <span>Wk 25: <strong>131 new</strong> / <strong style={{ color: "var(--color-green-600)" }}>104 resolved</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Contractor Performance */}
        <div className="card p-6">
          <span className="section-title mb-3" style={{ display: "block" }}>Contractor Response Times</span>
          <table className="data-table">
            <thead><tr><th>Contractor</th><th>Assigned</th><th>Resolved</th><th>Avg. Response</th><th>Overdue</th><th>Rating</th></tr></thead>
            <tbody>
              <tr><td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Contractor X</td><td style={{ fontWeight: 700 }}>187</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>142</td><td style={{ fontSize: "0.8125rem" }}>2.8 days</td><td style={{ fontWeight: 700, color: "var(--color-red-500)" }}>3</td><td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Good</span></td></tr>
              <tr><td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Sub-contractor Y</td><td style={{ fontWeight: 700 }}>98</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>61</td><td style={{ fontSize: "0.8125rem" }}>5.2 days</td><td style={{ fontWeight: 700, color: "var(--color-red-500)" }}>8</td><td><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>Fair</span></td></tr>
              <tr><td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Sub-contractor Z</td><td style={{ fontWeight: 700 }}>67</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>48</td><td style={{ fontSize: "0.8125rem" }}>3.4 days</td><td style={{ fontWeight: 700, color: "var(--color-red-500)" }}>2</td><td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Good</span></td></tr>
              <tr><td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Consultant Z</td><td style={{ fontWeight: 700 }}>45</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>38</td><td style={{ fontSize: "0.8125rem" }}>1.9 days</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>0</td><td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Excellent</span></td></tr>
            </tbody>
          </table>
        </div>
      </EdifiShell>
    </>
  );
}
