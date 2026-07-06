import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaAdminUsersPage() {
  const [tab, setTab] = useState(0);
  const tabs = ["All (12)", "Architects (4)", "Engineers (3)", "Site Teams (3)", "Contractors (2)"];

  return (
    <EdifiShell system="site-agent" activeNav="users" section="admin">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Team Management</h1>
            <p>Manage site team members, architects, contractors, and consultants.</p>
          </div>
          <button className="btn btn-primary"><EdIcon name="plus" size={14} /> Add Member</button>
        </div>
      </div>

      {/* Team Categories */}
      <div className="tab-group mb-6">
        {tabs.map((label, i) => (
          <button key={label} className={`tab-item ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>{label}</button>
        ))}
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead><tr><th>Member</th><th>Role</th><th>Category</th><th>Projects</th><th>Observations</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "var(--color-gray-900)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>AS</div><div><strong style={{ fontSize: "0.8125rem" }}>Ar. Sethi</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Admin · sethi@edifice.com</span></div></div></td><td><span className="badge badge-dark">Admin</span></td><td style={{ fontSize: "0.75rem" }}>Architect</td><td style={{ fontSize: "0.75rem" }}>All</td><td style={{ fontWeight: 700 }}>156</td><td><span className="status-dot status-dot-online"></span></td><td><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></td></tr>
            <tr><td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "#6366f1", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>RS</div><div><strong style={{ fontSize: "0.8125rem" }}>Ar. Sharma</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Lead · sharma@edifice.com</span></div></div></td><td><span className="badge badge-purple">Lead</span></td><td style={{ fontSize: "0.75rem" }}>Architect</td><td style={{ fontSize: "0.75rem" }}>Tower A, B</td><td style={{ fontWeight: 700 }}>234</td><td><span className="status-dot status-dot-online"></span></td><td><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></td></tr>
            <tr><td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "#f59e0b", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>VP</div><div><strong style={{ fontSize: "0.8125rem" }}>Eng. Patel</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Engineer · patel@edifice.com</span></div></div></td><td><span className="badge badge-blue">Member</span></td><td style={{ fontSize: "0.75rem" }}>Engineer</td><td style={{ fontSize: "0.75rem" }}>Tower B</td><td style={{ fontWeight: 700 }}>178</td><td><span className="status-dot status-dot-offline"></span></td><td><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></td></tr>
            <tr><td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "#22c55e", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>T1</div><div><strong style={{ fontSize: "0.8125rem" }}>Site Team 1</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>3 members · team1@edifice.com</span></div></div></td><td><span className="badge badge-green">Team</span></td><td style={{ fontSize: "0.75rem" }}>Site Team</td><td style={{ fontSize: "0.75rem" }}>Tower A</td><td style={{ fontWeight: 700 }}>312</td><td><span className="status-dot status-dot-online"></span></td><td><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></td></tr>
            <tr><td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "var(--color-gray-400)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>T2</div><div><strong style={{ fontSize: "0.8125rem" }}>Site Team 2</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>2 members · team2@edifice.com</span></div></div></td><td><span className="badge badge-green">Team</span></td><td style={{ fontSize: "0.75rem" }}>Site Team</td><td style={{ fontSize: "0.75rem" }}>Tower B, Podium</td><td style={{ fontWeight: 700 }}>245</td><td><span className="status-dot status-dot-offline"></span></td><td><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></td></tr>
            <tr><td><div className="flex items-center gap-3"><div style={{ width: "36px", height: "36px", background: "var(--color-cyan-500)", borderRadius: "var(--radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>CX</div><div><strong style={{ fontSize: "0.8125rem" }}>Contractor X</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>External · cx@contractor.com</span></div></div></td><td><span className="badge badge-amber">External</span></td><td style={{ fontSize: "0.75rem" }}>Contractor</td><td style={{ fontSize: "0.75rem" }}>Tower A</td><td style={{ fontWeight: 700 }}>—</td><td><span className="status-dot status-dot-warning"></span></td><td><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></td></tr>
          </tbody>
        </table>
      </div>
    </EdifiShell>
  );
}
