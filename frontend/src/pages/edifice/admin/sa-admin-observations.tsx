import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaAdminObservationsPage() {
  return (
    <EdifiShell system="site-agent" activeNav="observations" section="admin">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>All Observations</h1>
            <p>Global view of all observations across all projects — admin controls for assignment, escalation, and archival.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary"><EdIcon name="download" size={14} /> Export</button>
            <button className="btn btn-secondary"><EdIcon name="filter" size={14} /> Bulk Actions</button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <input type="text" className="form-input" placeholder="Search observations..." style={{ width: "280px", fontSize: "0.8125rem" }} />
        <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}><option>All Projects</option><option>Tower A</option><option>Tower B</option><option>Podium Block</option></select>
        <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}><option>All Severities</option><option>Critical</option><option>Major</option><option>Minor</option></select>
        <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}><option>All Status</option><option>Open</option><option>In Progress</option><option>Resolved</option><option>Archived</option></select>
        <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}><option>All Trades</option><option>Structural</option><option>MEP</option><option>Facade</option><option>Finishing</option></select>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead><tr><th><input type="checkbox" /></th><th>ID</th><th>Observation</th><th>Location</th><th>Severity</th><th>Status</th><th>Assigned</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td><input type="checkbox" /></td><td style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1248</td><td style={{ fontSize: "0.8125rem" }}><strong>Waterproofing breach</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 12, Zone A</span></td><td style={{ fontSize: "0.75rem" }}>Tower A</td><td><span className="badge severity-critical" style={{ fontSize: "0.5625rem" }}>Critical</span></td><td><span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>Open</span></td><td style={{ fontSize: "0.75rem" }}>Contractor X</td><td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>14 min</td><td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td></tr>
            <tr><td><input type="checkbox" /></td><td style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1247</td><td style={{ fontSize: "0.8125rem" }}><strong>Rebar spacing mismatch</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 7, Core B</span></td><td style={{ fontSize: "0.75rem" }}>Tower A</td><td><span className="badge severity-major" style={{ fontSize: "0.5625rem" }}>Major</span></td><td><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>In Progress</span></td><td style={{ fontSize: "0.75rem" }}>Sub-con Y</td><td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>42 min</td><td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td></tr>
            <tr><td><input type="checkbox" /></td><td style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1246</td><td style={{ fontSize: "0.8125rem" }}><strong>HVAC routing conflict</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 9, Zone C</span></td><td style={{ fontSize: "0.75rem" }}>Tower B</td><td><span className="badge severity-major" style={{ fontSize: "0.5625rem" }}>Major</span></td><td><span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>Open</span></td><td style={{ fontSize: "0.75rem" }}>—</td><td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>2 hrs</td><td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td></tr>
            <tr><td><input type="checkbox" /></td><td style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1245</td><td style={{ fontSize: "0.8125rem" }}><strong>Facade alignment resolved</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Elevation East</span></td><td style={{ fontSize: "0.75rem" }}>Tower A</td><td><span className="badge severity-minor" style={{ fontSize: "0.5625rem" }}>Minor</span></td><td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Resolved</span></td><td style={{ fontSize: "0.75rem" }}>Contractor X</td><td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>1 hr</td><td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td></tr>
            <tr><td><input type="checkbox" /></td><td style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1244</td><td style={{ fontSize: "0.8125rem" }}><strong>Plumbing drainage slope</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor 3, Washroom</span></td><td style={{ fontSize: "0.75rem" }}>Podium</td><td><span className="badge severity-observation" style={{ fontSize: "0.5625rem" }}>Observation</span></td><td><span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>Open</span></td><td style={{ fontSize: "0.75rem" }}>—</td><td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>3 hrs</td><td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button></div></td></tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4" style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>
        <span>Showing 5 of 1,247 observations</span>
        <div className="flex gap-2"><button className="btn btn-secondary btn-sm" disabled>Previous</button><button className="btn btn-secondary btn-sm">Next</button></div>
      </div>
    </EdifiShell>
  );
}
