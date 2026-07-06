import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaAdminDashboardPage() {
  return (
    <EdifiShell system="site-agent" activeNav="dashboard" section="admin">
      <div className="page-header">
        <h1>Site Agent Admin</h1>
        <p>System overview — observations, project health, team performance, and system analytics.</p>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-8" style={{ gap: "1rem" }}>
        <div className="stat-card stat-card-dark">
          <div className="stat-icon"><EdIcon name="database" size={18} /></div>
          <div className="stat-value">1,247</div>
          <div className="stat-label">Total Observations</div>
        </div>
        <div className="stat-card stat-card-red">
          <div className="stat-icon"><EdIcon name="alertCircle" size={18} /></div>
          <div className="stat-value">23</div>
          <div className="stat-label">Critical Open</div>
        </div>
        <div className="stat-card stat-card-green">
          <div className="stat-icon"><EdIcon name="trendingUp" size={18} /></div>
          <div className="stat-value">68%</div>
          <div className="stat-label">Resolution Rate</div>
        </div>
        <div className="stat-card stat-card-blue">
          <div className="stat-icon"><EdIcon name="users" size={18} /></div>
          <div className="stat-value">12</div>
          <div className="stat-label">Active Users</div>
        </div>
      </div>

      <div className="grid-2 mb-8" style={{ gap: "1.5rem" }}>
        {/* Per-Project Summary */}
        <div className="card p-6">
          <div className="section-header">
            <span className="section-title">Project Summary</span>
            <a href="/admin/sa-admin-projects-mgmt" className="btn btn-ghost btn-sm">Manage</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div style={{ width: "44px", height: "44px", background: "var(--color-gray-900)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <EdIcon name="building" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between"><strong style={{ fontSize: "0.8125rem" }}>Tower A</strong><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>487 obs</span></div>
                <div className="progress-bar mt-1" style={{ height: "4px" }}><div className="progress-fill progress-fill-green" style={{ width: "64%" }}></div></div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>64% resolved · 12 critical</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div style={{ width: "44px", height: "44px", background: "#6366f1", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <EdIcon name="building" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between"><strong style={{ fontSize: "0.8125rem" }}>Tower B</strong><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>398 obs</span></div>
                <div className="progress-bar mt-1" style={{ height: "4px" }}><div className="progress-fill progress-fill-green" style={{ width: "75%" }}></div></div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>75% resolved · 6 critical</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div style={{ width: "44px", height: "44px", background: "#f59e0b", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <EdIcon name="building" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between"><strong style={{ fontSize: "0.8125rem" }}>Podium Block</strong><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>362 obs</span></div>
                <div className="progress-bar mt-1" style={{ height: "4px" }}><div className="progress-fill progress-fill-green" style={{ width: "65%" }}></div></div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>65% resolved · 5 critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="card p-6">
          <div className="section-header"><span className="section-title">Team Activity — This Week</span></div>
          <table className="data-table">
            <thead><tr><th>Team Member</th><th>Observations</th><th>Resolved</th><th>Active</th></tr></thead>
            <tbody>
              <tr><td><div className="flex items-center gap-2"><div style={{ width: "28px", height: "28px", background: "#6366f1", borderRadius: "var(--radius-lg)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem", fontWeight: 700 }}>RS</div><span style={{ fontSize: "0.8125rem" }}>Ar. Sharma</span></div></td><td style={{ fontWeight: 700 }}>42</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>31</td><td><span className="status-dot status-dot-online"></span></td></tr>
              <tr><td><div className="flex items-center gap-2"><div style={{ width: "28px", height: "28px", background: "#f59e0b", borderRadius: "var(--radius-lg)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem", fontWeight: 700 }}>VP</div><span style={{ fontSize: "0.8125rem" }}>Eng. Patel</span></div></td><td style={{ fontWeight: 700 }}>38</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>27</td><td><span className="status-dot status-dot-online"></span></td></tr>
              <tr><td><div className="flex items-center gap-2"><div style={{ width: "28px", height: "28px", background: "#22c55e", borderRadius: "var(--radius-lg)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem", fontWeight: 700 }}>ST</div><span style={{ fontSize: "0.8125rem" }}>Site Team 1</span></div></td><td style={{ fontWeight: 700 }}>29</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>18</td><td><span className="status-dot status-dot-offline"></span></td></tr>
              <tr><td><div className="flex items-center gap-2"><div style={{ width: "28px", height: "28px", background: "var(--color-gray-400)", borderRadius: "var(--radius-lg)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem", fontWeight: 700 }}>S2</div><span style={{ fontSize: "0.8125rem" }}>Site Team 2</span></div></td><td style={{ fontWeight: 700 }}>24</td><td style={{ fontWeight: 700, color: "var(--color-green-600)" }}>14</td><td><span className="status-dot status-dot-offline"></span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Overdue Items */}
      <div className="card p-6 mb-6">
        <div className="section-header"><span className="section-title">⚠️ Overdue Items</span><span className="badge badge-red">8 overdue</span></div>
        <table className="data-table">
          <thead><tr><th>Observation</th><th>Location</th><th>Severity</th><th>Assigned To</th><th>Days Overdue</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td style={{ fontSize: "0.8125rem" }}><strong>Electrical conduit spacing</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>OBS-1198</span></td><td style={{ fontSize: "0.75rem" }}>Floor 7, Zone A</td><td><span className="badge severity-critical" style={{ fontSize: "0.5625rem" }}>Critical</span></td><td style={{ fontSize: "0.75rem" }}>Sub-contractor Y</td><td style={{ fontWeight: 700, color: "var(--color-red-500)" }}>5 days</td><td><button className="btn btn-secondary btn-sm">Escalate</button></td></tr>
            <tr><td style={{ fontSize: "0.8125rem" }}><strong>Fire damper not installed</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>OBS-1187</span></td><td style={{ fontSize: "0.75rem" }}>Floor 4, Core A</td><td><span className="badge severity-critical" style={{ fontSize: "0.5625rem" }}>Critical</span></td><td style={{ fontSize: "0.75rem" }}>Contractor X</td><td style={{ fontWeight: 700, color: "var(--color-red-500)" }}>7 days</td><td><button className="btn btn-secondary btn-sm">Escalate</button></td></tr>
            <tr><td style={{ fontSize: "0.8125rem" }}><strong>Waterproofing overlap insufficient</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>OBS-1172</span></td><td style={{ fontSize: "0.75rem" }}>Floor 10, Terrace</td><td><span className="badge severity-major" style={{ fontSize: "0.5625rem" }}>Major</span></td><td style={{ fontSize: "0.75rem" }}>Sub-contractor Z</td><td style={{ fontWeight: 700, color: "var(--color-amber-500)" }}>3 days</td><td><button className="btn btn-secondary btn-sm">Escalate</button></td></tr>
          </tbody>
        </table>
      </div>
    </EdifiShell>
  );
}
