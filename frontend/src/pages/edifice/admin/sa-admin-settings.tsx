import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaAdminSettingsPage() {
  const [ai, setAi] = useState([true, true, true, true, true]);
  const [notif, setNotif] = useState([true, true, true, false]);
  const [integ, setInteg] = useState([true, false]);
  const toggle = (arr: boolean[], setArr: (v: boolean[]) => void, i: number) =>
    setArr(arr.map((v, idx) => (idx === i ? !v : v)));

  return (
    <>
      <style>{`
    .settings-section { border: 1px solid var(--color-gray-100); border-radius: var(--radius-2xl); padding: 1.5rem; background: white; margin-bottom: 1.5rem; }
    .toggle-switch { width: 36px; height: 20px; border-radius: 10px; background: var(--color-gray-200); position: relative; cursor: pointer; transition: background 0.2s; }
    .toggle-switch.active { background: var(--color-green-500); }
    .toggle-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: var(--shadow-sm); }
    .toggle-switch.active::after { transform: translateX(16px); }
      `}</style>
      <EdifiShell system="site-agent" activeNav="settings" section="admin">
        <div className="page-header">
          <h1>Site Agent Settings</h1>
          <p>Configure system preferences, AI classification, and notification settings.</p>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>AI & Classification</h3>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Enable AI Auto-Classification</span><div className={`toggle-switch ${ai[0] ? "active" : ""}`} onClick={() => toggle(ai, setAi, 0)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Auto-Transcribe Voice Notes</span><div className={`toggle-switch ${ai[1] ? "active" : ""}`} onClick={() => toggle(ai, setAi, 1)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Auto-Assign Observations to Trade</span><div className={`toggle-switch ${ai[2] ? "active" : ""}`} onClick={() => toggle(ai, setAi, 2)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Cross-Reference with Validation System</span><div className={`toggle-switch ${ai[3] ? "active" : ""}`} onClick={() => toggle(ai, setAi, 3)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Enable Geo-Tagging on Photos</span><div className={`toggle-switch ${ai[4] ? "active" : ""}`} onClick={() => toggle(ai, setAi, 4)}></div></div>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Observation Defaults</h3>
          <div className="grid-2" style={{ gap: "1rem" }}>
            <div className="form-group"><label className="form-label">Default Severity</label><select className="form-input form-select"><option>Minor</option><option>Major</option><option>Critical</option><option>Observation</option></select></div>
            <div className="form-group"><label className="form-label">Resolution SLA (Days)</label><input className="form-input" type="number" defaultValue="5" /></div>
            <div className="form-group"><label className="form-label">Critical SLA (Days)</label><input className="form-input" type="number" defaultValue="2" /></div>
            <div className="form-group"><label className="form-label">Max Photos per Observation</label><input className="form-input" type="number" defaultValue="10" /></div>
          </div>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Notifications</h3>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Email on Critical Observation</span><div className={`toggle-switch ${notif[0] ? "active" : ""}`} onClick={() => toggle(notif, setNotif, 0)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Daily Summary Email</span><div className={`toggle-switch ${notif[1] ? "active" : ""}`} onClick={() => toggle(notif, setNotif, 1)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>SLA Breach Alerts</span><div className={`toggle-switch ${notif[2] ? "active" : ""}`} onClick={() => toggle(notif, setNotif, 2)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Push Notifications (Mobile)</span><div className={`toggle-switch ${notif[3] ? "active" : ""}`} onClick={() => toggle(notif, setNotif, 3)}></div></div>
        </div>

        <div className="settings-section">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Integration</h3>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>Sync with Drawing Validation Engine</span><div className={`toggle-switch ${integ[0] ? "active" : ""}`} onClick={() => toggle(integ, setInteg, 0)}></div></div>
          <div className="flex items-center justify-between py-3"><span style={{ fontSize: "0.875rem" }}>BIM Model Integration (Future)</span><div className={`toggle-switch ${integ[1] ? "active" : ""}`} onClick={() => toggle(integ, setInteg, 1)}></div></div>
          <div className="form-group mt-3"><label className="form-label">Webhook URL (Optional)</label><input className="form-input" placeholder="https://api.example.com/webhook" style={{ maxWidth: "500px" }} /></div>
        </div>

        <div className="flex justify-end gap-3"><button className="btn btn-secondary">Cancel</button><button className="btn btn-primary"><EdIcon name="check" size={14} /> Save Settings</button></div>
      </EdifiShell>
    </>
  );
}
