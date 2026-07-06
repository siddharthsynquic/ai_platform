import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminSettingsPage() {
  return (
    <>
      <style>{`
        .settings-section { border: 1px solid var(--color-gray-100); border-radius: var(--radius-2xl); padding: 1.5rem; background: white; margin-bottom: 1.5rem; }
        .toggle-switch { width: 36px; height: 20px; border-radius: 10px; background: var(--color-gray-200); position: relative; cursor: pointer; transition: background 0.2s; }
        .toggle-switch.active { background: var(--color-green-500); }
        .toggle-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: var(--shadow-sm); }
        .toggle-switch.active::after { transform: translateX(16px); }
      `}</style>
      <EdifiShell system="validation" activeNav="settings" section="admin">
        <div className="page-header">
          <h1>System Settings</h1>
          <p>Configure system preferences, API integrations, and notification settings.</p>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>General</h3>
          <div className="form-group"><label className="form-label">Organization Name</label><input className="form-input" defaultValue="Edifice Architects" style={{ maxWidth: "400px" }} /></div>
          <div className="form-group"><label className="form-label">Default Project</label><select className="form-input form-select" style={{ maxWidth: "400px" }}><option>Tower A — Edifice Commercial</option><option>Tower B — Edifice Commercial</option></select></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Enable Auto Stage Detection</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Enable Spatial Drift Advisories</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Enable Precedent Drawing Search</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Data Pipeline</h3>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Upload Cadence</span><select className="form-input form-select" style={{ width: "200px" }}><option>Monthly</option><option>Bi-weekly</option><option>Weekly</option></select></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Require Admin Approval for Cache → Live</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Auto-index uploaded PDFs</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Notifications</h3>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Email on Critical Validation Errors</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Email on Training Completion</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Weekly Summary Digest</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div>
        </div>

        <div className="settings-section" style={{ borderColor: "var(--color-red-100)" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.5rem", color: "var(--color-red-500)" }}>Danger Zone</h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginBottom: "1rem" }}>These actions are destructive and cannot be undone.</p>
          <div className="flex gap-3">
            <button className="btn btn-secondary btn-sm" style={{ color: "var(--color-red-500)", borderColor: "var(--color-red-200)" }}>Reset All Validation Rules</button>
            <button className="btn btn-secondary btn-sm" style={{ color: "var(--color-red-500)", borderColor: "var(--color-red-200)" }}>Clear Training Cache</button>
          </div>
        </div>

        <div className="flex justify-end gap-3"><button className="btn btn-secondary">Cancel</button><button className="btn btn-primary"><EdIcon name="check" size={14} /> Save Settings</button></div>
      </EdifiShell>
    </>
  );
}
