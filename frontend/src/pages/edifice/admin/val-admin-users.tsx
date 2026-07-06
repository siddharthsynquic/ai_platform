import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminUsersPage() {
  return (
    <EdifiShell system="validation" activeNav="users" section="admin">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Users & Roles</h1>
            <p>Manage user access, roles, and permissions across the validation system.</p>
          </div>
          <button className="btn btn-primary"><EdIcon name="plus" size={14} /> Invite User</button>
        </div>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead><tr><th>User</th><th>Role</th><th>Access Level</th><th>Last Active</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr>
              <td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "var(--color-gray-900)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: "700" }}>AS</div><div><strong style={{ fontSize: "0.8125rem" }}>Ar. Sethi</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>sethi@edifice.com</span></div></div></td>
              <td><span className="badge badge-dark">Admin</span></td>
              <td style={{ fontSize: "0.75rem" }}>Full Access</td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Just now</td>
              <td><span className="flex items-center gap-2" style={{ fontSize: "0.75rem" }}><span className="status-dot status-dot-online"></span> Online</span></td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td>
            </tr>
            <tr>
              <td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "#6366f1", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: "700" }}>RS</div><div><strong style={{ fontSize: "0.8125rem" }}>Ar. Sharma</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>sharma@edifice.com</span></div></div></td>
              <td><span className="badge badge-purple">Reviewer</span></td>
              <td style={{ fontSize: "0.75rem" }}>Upload + Review</td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>14 min ago</td>
              <td><span className="flex items-center gap-2" style={{ fontSize: "0.75rem" }}><span className="status-dot status-dot-online"></span> Online</span></td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td>
            </tr>
            <tr>
              <td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "#f59e0b", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: "700" }}>VP</div><div><strong style={{ fontSize: "0.8125rem" }}>Eng. Patel</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>patel@edifice.com</span></div></div></td>
              <td><span className="badge badge-blue">Uploader</span></td>
              <td style={{ fontSize: "0.75rem" }}>Upload Only</td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>2 hrs ago</td>
              <td><span className="flex items-center gap-2" style={{ fontSize: "0.75rem" }}><span className="status-dot status-dot-offline"></span> Offline</span></td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td>
            </tr>
            <tr>
              <td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "#22c55e", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: "700" }}>SK</div><div><strong style={{ fontSize: "0.8125rem" }}>Ar. Khan</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>khan@edifice.com</span></div></div></td>
              <td><span className="badge badge-purple">Reviewer</span></td>
              <td style={{ fontSize: "0.75rem" }}>Upload + Review</td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Yesterday</td>
              <td><span className="flex items-center gap-2" style={{ fontSize: "0.75rem" }}><span className="status-dot status-dot-offline"></span> Offline</span></td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td>
            </tr>
            <tr>
              <td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "var(--color-gray-300)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: "700" }}>MR</div><div><strong style={{ fontSize: "0.8125rem" }}>Ar. Rao</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>rao@edifice.com</span></div></div></td>
              <td><span className="badge badge-gray">Viewer</span></td>
              <td style={{ fontSize: "0.75rem" }}>View Only</td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 20</td>
              <td><span className="flex items-center gap-2" style={{ fontSize: "0.75rem" }}><span className="status-dot status-dot-offline"></span> Offline</span></td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Role Permissions */}
      <div className="card card-flat p-6 mt-6">
        <span className="section-title">Role Permissions</span>
        <div className="grid-4 mt-4" style={{ gap: "1rem" }}>
          <div className="card p-4">
            <span className="badge badge-dark mb-2">Admin</span>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: "1.5" }}>Full system access — manage users, configure rules, approve drawings, retrain models.</p>
          </div>
          <div className="card p-4">
            <span className="badge badge-purple mb-2">Reviewer</span>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: "1.5" }}>Upload drawings, review validation results, approve cache-to-live transitions.</p>
          </div>
          <div className="card p-4">
            <span className="badge badge-blue mb-2">Uploader</span>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: "1.5" }}>Upload drawings for validation. View own results. Cannot approve or modify rules.</p>
          </div>
          <div className="card p-4">
            <span className="badge badge-gray mb-2">Viewer</span>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: "1.5" }}>Read-only access to reports, dashboards, and standard details library.</p>
          </div>
        </div>
      </div>
    </EdifiShell>
  );
}
