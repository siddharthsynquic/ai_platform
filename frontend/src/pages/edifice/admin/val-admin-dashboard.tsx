import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminDashboardPage() {
  return (
    <EdifiShell system="validation" activeNav="dashboard" section="admin">
      <div className="page-header">
        <h1>Validation Admin</h1>
        <p>System overview — drawing database, validation pipeline, and training status.</p>
      </div>

      {/* System Health */}
      <div className="grid-4 mb-8" style={{ gap: "1rem" }}>
        <div className="stat-card stat-card-dark">
          <div className="stat-icon"><EdIcon name="database" size={18} /></div>
          <div className="stat-value">247</div>
          <div className="stat-label">Drawings Indexed</div>
        </div>
        <div className="stat-card stat-card-purple">
          <div className="stat-icon"><EdIcon name="folder" size={18} /></div>
          <div className="stat-value">34</div>
          <div className="stat-label">Standard Details</div>
        </div>
        <div className="stat-card stat-card-green">
          <div className="stat-icon"><EdIcon name="zap" size={18} /></div>
          <div className="stat-value">3</div>
          <div className="stat-label">Models Trained</div>
        </div>
        <div className="stat-card stat-card-blue">
          <div className="stat-icon"><EdIcon name="users" size={18} /></div>
          <div className="stat-value">8</div>
          <div className="stat-label">Active Users</div>
        </div>
      </div>

      {/* Database Status */}
      <div className="grid-2 mb-8" style={{ gap: "1.5rem" }}>
        <div className="card p-6">
          <div className="section-header">
            <span className="section-title">Drawing Database — By Stage</span>
            <a href="/admin/val-admin-drawings" className="btn btn-ghost btn-sm">Manage</a>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between mb-1" style={{ fontSize: "0.8125rem" }}>
                <span className="flex items-center gap-2"><span className="badge badge-purple" style={{ fontSize: "0.5625rem" }}>SD</span> Schematic Design</span>
                <span style={{ fontWeight: "700" }}>82 drawings</span>
              </div>
              <div className="progress-bar" style={{ height: "4px" }}><div className="progress-fill" style={{ width: "82%", background: "#6366f1" }}></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1" style={{ fontSize: "0.8125rem" }}>
                <span className="flex items-center gap-2"><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span> Design Development</span>
                <span style={{ fontWeight: "700" }}>93 drawings</span>
              </div>
              <div className="progress-bar" style={{ height: "4px" }}><div className="progress-fill progress-fill-amber" style={{ width: "93%" }}></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1" style={{ fontSize: "0.8125rem" }}>
                <span className="flex items-center gap-2"><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span> Good for Construction</span>
                <span style={{ fontWeight: "700" }}>72 drawings</span>
              </div>
              <div className="progress-bar" style={{ height: "4px" }}><div className="progress-fill progress-fill-green" style={{ width: "72%" }}></div></div>
            </div>
          </div>
          <div className="card card-flat p-4 mt-4" style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>
            <strong>Target:</strong> 60–100 drawings per stage · <strong>Status:</strong> On track for all stages
          </div>
        </div>

        <div className="card p-6">
          <div className="section-header">
            <span className="section-title">Training Pipeline Status</span>
            <a href="/admin/val-admin-training" className="btn btn-ghost btn-sm">Details</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div style={{ width: "40px", height: "40px", background: "var(--color-green-50)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-green-500)" }}>
                <EdIcon name="checkCircle" size={18} />
              </div>
              <div style={{ flex: "1" }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: "600" }}>SD Model — Spatial Intelligence</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Trained on 82 drawings · Accuracy: 94.2%</p>
              </div>
              <span className="badge badge-green">Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width: "40px", height: "40px", background: "var(--color-amber-50)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-amber-500)" }}>
                <EdIcon name="loader" size={18} />
              </div>
              <div style={{ flex: "1" }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: "600" }}>DD Model — Detail Accuracy</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Training in progress · 78% complete</p>
              </div>
              <span className="badge badge-amber">Training</span>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width: "40px", height: "40px", background: "var(--color-gray-100)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gray-400)" }}>
                <EdIcon name="clock" size={18} />
              </div>
              <div style={{ flex: "1" }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: "600" }}>GFC Model — Precision & Readiness</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Queued — awaiting DD completion</p>
              </div>
              <span className="badge badge-gray">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Loop & Approvals */}
      <div className="card p-6 mb-8">
        <div className="section-header">
          <span className="section-title">Pending Approvals — Cache Layer</span>
          <span className="badge badge-amber">4 pending</span>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginBottom: "1rem" }}>Validated and approved drawings awaiting monthly upload to the live database.</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Drawing</th>
              <th>Stage</th>
              <th>Validated</th>
              <th>Approved By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: "0.8125rem" }}><strong>Floor Plan — Level 5</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-FP-005</span></td>
              <td><span className="badge badge-amber">DD</span></td>
              <td style={{ fontSize: "0.75rem" }}>Jun 24</td>
              <td style={{ fontSize: "0.8125rem" }}>Ar. Sethi</td>
              <td><button className="btn btn-primary btn-sm">Approve</button></td>
            </tr>
            <tr>
              <td style={{ fontSize: "0.8125rem" }}><strong>Section — Core A</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-SEC-A01</span></td>
              <td><span className="badge badge-green">GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>Jun 23</td>
              <td style={{ fontSize: "0.8125rem" }}>Ar. Sharma</td>
              <td><button className="btn btn-primary btn-sm">Approve</button></td>
            </tr>
            <tr>
              <td style={{ fontSize: "0.8125rem" }}><strong>Detail Sheet — Staircase</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-DT-ST02</span></td>
              <td><span className="badge badge-amber">DD</span></td>
              <td style={{ fontSize: "0.75rem" }}>Jun 23</td>
              <td style={{ fontSize: "0.8125rem" }}>Ar. Sethi</td>
              <td><button className="btn btn-primary btn-sm">Approve</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recent Admin Activity */}
      <div className="card card-flat p-5">
        <span className="section-title">Recent Admin Actions</span>
        <div className="flex flex-col gap-2 mt-3" style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)" }}>
          <div className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "var(--color-gray-100)" }}>
            <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Upload</span>
            <span>12 DD drawings uploaded by Ar. Sethi</span>
            <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "var(--color-gray-100)" }}>
            <span className="badge badge-blue" style={{ fontSize: "0.5625rem" }}>Config</span>
            <span>Validation rule updated: DD Dimensional Accuracy threshold</span>
            <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Yesterday</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <span className="badge badge-purple" style={{ fontSize: "0.5625rem" }}>Training</span>
            <span>SD model retrained with 8 new drawings</span>
            <span style={{ marginLeft: "auto", fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 22</span>
          </div>
        </div>
      </div>
    </EdifiShell>
  );
}
