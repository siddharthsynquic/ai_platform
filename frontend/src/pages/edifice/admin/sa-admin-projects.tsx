import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaAdminProjectsPage() {
  return (
    <EdifiShell system="site-agent" activeNav="projects" section="admin">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Projects</h1>
            <p>Manage active construction projects and their site observation configurations.</p>
          </div>
          <button className="btn btn-primary"><EdIcon name="plus" size={14} /> New Project</button>
        </div>
      </div>

      <div className="grid-3" style={{ gap: "1.5rem" }}>
        <div className="card p-6" style={{ borderTop: "4px solid var(--color-gray-900)", cursor: "pointer" }}>
          <div className="flex items-center justify-between mb-3"><h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Tower A</h3><span className="badge badge-green">Active</span></div>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginBottom: "1rem" }}>Edifice Commercial · 15 floors · Office</p>
          <div className="grid-3" style={{ gap: "0.75rem", textAlign: "center", marginBottom: "1.25rem" }}>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700 }}>487</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Observations</span></div>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-green-600)" }}>312</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Resolved</span></div>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-red-500)" }}>12</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Critical</span></div>
          </div>
          <div className="progress-bar mb-2" style={{ height: "6px" }}><div className="progress-fill progress-fill-green" style={{ width: "64%" }}></div></div>
          <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>64% resolved</span>
          <div className="flex gap-2 mt-4"><button className="btn btn-secondary btn-sm flex-1"><EdIcon name="settings" size={12} /> Configure</button><button className="btn btn-ghost btn-sm flex-1"><EdIcon name="eye" size={12} /> View</button></div>
        </div>

        <div className="card p-6" style={{ borderTop: "4px solid #6366f1", cursor: "pointer" }}>
          <div className="flex items-center justify-between mb-3"><h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Tower B</h3><span className="badge badge-green">Active</span></div>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginBottom: "1rem" }}>Edifice Commercial · 12 floors · Office</p>
          <div className="grid-3" style={{ gap: "0.75rem", textAlign: "center", marginBottom: "1.25rem" }}>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700 }}>398</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Observations</span></div>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-green-600)" }}>298</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Resolved</span></div>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-red-500)" }}>6</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Critical</span></div>
          </div>
          <div className="progress-bar mb-2" style={{ height: "6px" }}><div className="progress-fill progress-fill-green" style={{ width: "75%" }}></div></div>
          <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>75% resolved</span>
          <div className="flex gap-2 mt-4"><button className="btn btn-secondary btn-sm flex-1"><EdIcon name="settings" size={12} /> Configure</button><button className="btn btn-ghost btn-sm flex-1"><EdIcon name="eye" size={12} /> View</button></div>
        </div>

        <div className="card p-6" style={{ borderTop: "4px solid #f59e0b", cursor: "pointer" }}>
          <div className="flex items-center justify-between mb-3"><h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Podium Block</h3><span className="badge badge-green">Active</span></div>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginBottom: "1rem" }}>Edifice Commercial · 4 floors · Mixed-Use</p>
          <div className="grid-3" style={{ gap: "0.75rem", textAlign: "center", marginBottom: "1.25rem" }}>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700 }}>362</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Observations</span></div>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-green-600)" }}>237</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Resolved</span></div>
            <div><div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-red-500)" }}>5</div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Critical</span></div>
          </div>
          <div className="progress-bar mb-2" style={{ height: "6px" }}><div className="progress-fill progress-fill-green" style={{ width: "65%" }}></div></div>
          <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>65% resolved</span>
          <div className="flex gap-2 mt-4"><button className="btn btn-secondary btn-sm flex-1"><EdIcon name="settings" size={12} /> Configure</button><button className="btn btn-ghost btn-sm flex-1"><EdIcon name="eye" size={12} /> View</button></div>
        </div>
      </div>
    </EdifiShell>
  );
}
