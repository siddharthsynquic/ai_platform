import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValDashboardPage() {
  return (
    <EdifiShell system="validation" activeNav="dashboard" section="user">
      {/* Page Header */}
      <div className="page-header">
        <h1>Drawing Validation</h1>
        <p>Stage-aware validation intelligence across SD, DD, and GFC stages.</p>
      </div>

      {/* Stats Row */}
      <div className="grid-4 mb-10">
        <div className="stat-card stat-card-dark" onClick={() => (window.location.href = "/user/val-reports")}>
          <div className="stat-icon"><EdIcon name="database" size={20} /></div>
          <div className="stat-value">247</div>
          <div className="stat-label">Total Drawings</div>
          <div className="stat-sub">Across 3 stages</div>
        </div>
        <div className="stat-card stat-card-green">
          <div className="stat-icon"><EdIcon name="checkCircle" size={20} /></div>
          <div className="stat-value">189</div>
          <div className="stat-label">Validated</div>
          <div className="stat-sub">76% pass rate</div>
        </div>
        <div className="stat-card stat-card-amber">
          <div className="stat-icon"><EdIcon name="alertTriangle" size={20} /></div>
          <div className="stat-value">42</div>
          <div className="stat-label">Flagged</div>
          <div className="stat-sub">18 critical errors</div>
        </div>
        <div className="stat-card stat-card-blue">
          <div className="stat-icon"><EdIcon name="layers" size={20} /></div>
          <div className="stat-value">16</div>
          <div className="stat-label">Pending</div>
          <div className="stat-sub">Awaiting review</div>
        </div>
      </div>

      {/* Stage Progression */}
      <div className="card card-flat mb-8 p-6">
        <div className="section-header">
          <span className="section-title">Stage Progression — Active Projects</span>
          <a href="/user/val-stage-view" className="btn btn-ghost btn-sm">
            View All <EdIcon name="chevronRight" size={12} />
          </a>
        </div>
        <div className="grid-3" style={{ gap: "1rem" }}>
          {/* SD Stage */}
          <div className="card p-5" style={{ borderLeft: "4px solid #6366f1" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-purple">SD — Schematic Design</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Stage 1</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Spatial Intelligence</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>82%</span>
            </div>
            <div className="progress-bar mb-3">
              <div className="progress-fill" style={{ width: "82%", background: "#6366f1" }}></div>
            </div>
            <div className="flex justify-between" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
              <span>67 drawings validated</span>
              <span>15 flagged</span>
            </div>
          </div>
          {/* DD Stage */}
          <div className="card p-5" style={{ borderLeft: "4px solid #f59e0b" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-amber">DD — Design Development</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Stage 2</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Detail Accuracy</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>71%</span>
            </div>
            <div className="progress-bar mb-3">
              <div className="progress-fill" style={{ width: "71%", background: "#f59e0b" }}></div>
            </div>
            <div className="flex justify-between" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
              <span>58 drawings validated</span>
              <span>24 flagged</span>
            </div>
          </div>
          {/* GFC Stage */}
          <div className="card p-5" style={{ borderLeft: "4px solid #22c55e" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-green">GFC — Good for Construction</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Stage 3</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Precision & Readiness</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>94%</span>
            </div>
            <div className="progress-bar mb-3">
              <div className="progress-fill progress-fill-green" style={{ width: "94%" }}></div>
            </div>
            <div className="flex justify-between" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
              <span>64 drawings validated</span>
              <span>3 flagged</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2 mb-8" style={{ gap: "1.5rem" }}>
        {/* Recent Validations */}
        <div className="card p-6">
          <div className="section-header">
            <span className="section-title">Recent Validations</span>
            <a href="/user/val-reports" className="btn btn-ghost btn-sm">View All</a>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Drawing</th>
                <th>Stage</th>
                <th>Status</th>
                <th>Flags</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: "pointer" }} onClick={() => (window.location.href = "/user/val-reports")}>
                <td><strong style={{ fontSize: "0.8125rem" }}>Floor Plan — Level 3</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-FP-003 · Tower A</span></td>
                <td><span className="badge badge-amber">DD</span></td>
                <td><span className="badge badge-red">3 Errors</span></td>
                <td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>3</td>
              </tr>
              <tr style={{ cursor: "pointer" }} onClick={() => (window.location.href = "/user/val-reports")}>
                <td><strong style={{ fontSize: "0.8125rem" }}>Staircase Detail — Core B</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-ST-012 · Tower A</span></td>
                <td><span className="badge badge-green">GFC</span></td>
                <td><span className="badge badge-green">Passed</span></td>
                <td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>0</td>
              </tr>
              <tr style={{ cursor: "pointer" }} onClick={() => (window.location.href = "/user/val-reports")}>
                <td><strong style={{ fontSize: "0.8125rem" }}>MEP Layout — Basement 1</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-MEP-B1 · Tower A</span></td>
                <td><span className="badge badge-purple">SD</span></td>
                <td><span className="badge badge-amber">1 Caution</span></td>
                <td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>1</td>
              </tr>
              <tr style={{ cursor: "pointer" }} onClick={() => (window.location.href = "/user/val-reports")}>
                <td><strong style={{ fontSize: "0.8125rem" }}>Elevation — North Facade</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-EL-N01 · Tower A</span></td>
                <td><span className="badge badge-amber">DD</span></td>
                <td><span className="badge badge-red">5 Errors</span></td>
                <td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>5</td>
              </tr>
              <tr style={{ cursor: "pointer" }} onClick={() => (window.location.href = "/user/val-reports")}>
                <td><strong style={{ fontSize: "0.8125rem" }}>Section — Through Lobby</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-SEC-L01 · Tower B</span></td>
                <td><span className="badge badge-green">GFC</span></td>
                <td><span className="badge badge-green">Passed</span></td>
                <td style={{ fontSize: "0.8125rem", fontWeight: 600 }}>0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Validation Insights */}
        <div className="card p-6">
          <div className="section-header">
            <span className="section-title">Validation Insights</span>
          </div>
          {/* Error Distribution */}
          <div className="mb-6">
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, marginBottom: "1rem" }}>Error Distribution by Type</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <div className="flex justify-between" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                  <span>Missing Dimensions</span><span style={{ color: "var(--color-gray-400)" }}>38</span>
                </div>
                <div className="progress-bar" style={{ height: "6px" }}>
                  <div className="progress-fill progress-fill-red" style={{ width: "76%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                  <span>Cross-Reference Errors</span><span style={{ color: "var(--color-gray-400)" }}>24</span>
                </div>
                <div className="progress-bar" style={{ height: "6px" }}>
                  <div className="progress-fill progress-fill-amber" style={{ width: "48%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                  <span>Annotation Issues</span><span style={{ color: "var(--color-gray-400)" }}>19</span>
                </div>
                <div className="progress-bar" style={{ height: "6px" }}>
                  <div className="progress-fill" style={{ width: "38%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                  <span>Spatial Logic Flags</span><span style={{ color: "var(--color-gray-400)" }}>15</span>
                </div>
                <div className="progress-bar" style={{ height: "6px" }}>
                  <div className="progress-fill" style={{ width: "30%", background: "#6366f1" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                  <span>Schedule Mismatches</span><span style={{ color: "var(--color-gray-400)" }}>8</span>
                </div>
                <div className="progress-bar" style={{ height: "6px" }}>
                  <div className="progress-fill" style={{ width: "16%", background: "#06b6d4" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ borderTop: "1px solid var(--color-gray-100)", paddingTop: "1.25rem" }}>
            <p className="label mb-3">Quick Actions</p>
            <div className="flex flex-col gap-2">
              <a href="/user/val-upload" className="btn btn-primary w-full" style={{ justifyContent: "flex-start" }}>
                <EdIcon name="upload" size={16} />
                Upload New Drawing
              </a>
              <a href="/user/val-references" className="btn btn-secondary w-full" style={{ justifyContent: "flex-start" }}>
                <EdIcon name="fileText" size={16} />
                Browse Standard Details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Site Tips Integration */}
      <div className="card card-flat p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: "36px", height: "36px", background: "var(--color-amber-50)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-amber-500)" }}>
            <EdIcon name="zap" size={18} />
          </div>
          <div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 700 }}>Get Site Tips</p>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Surface known recurring site issues for the current project stage</p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="card p-4" style={{ flex: 1, minWidth: "200px", borderLeft: "3px solid var(--color-amber-400)" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "4px" }}>⚠️ Staircase Landing Rebar</p>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Flagged 4 times across 2 projects in last 60 days. Review SD-STAIR-007 before GFC issue.</p>
          </div>
          <div className="card p-4" style={{ flex: 1, minWidth: "200px", borderLeft: "3px solid var(--color-blue-400)" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "4px" }}>💡 Parapet Waterproofing</p>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Standard detail SD-WP-012 not referenced in 3 recent GFC sets. Consider mandatory inclusion.</p>
          </div>
          <div className="card p-4" style={{ flex: 1, minWidth: "200px", borderLeft: "3px solid var(--color-green-400)" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "4px" }}>✅ Facade Alignment</p>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-500)" }}>Last 5 facade detail submissions passed validation. Current standards effective.</p>
          </div>
        </div>
      </div>
    </EdifiShell>
  );
}
