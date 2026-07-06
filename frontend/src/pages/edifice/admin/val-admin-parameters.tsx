import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminParametersPage() {
  return (
    <>
      <style>{`
        .rule-card { border: 1px solid var(--color-gray-100); border-radius: var(--radius-2xl); padding: 1.5rem; background: white; margin-bottom: 1rem; }
        .rule-card:hover { border-color: var(--color-gray-200); box-shadow: var(--shadow-sm); }
        .param-row { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--color-gray-50); font-size: 0.8125rem; }
        .param-row:last-child { border-bottom: none; }
        .toggle-switch { width: 36px; height: 20px; border-radius: 10px; background: var(--color-gray-200); position: relative; cursor: pointer; transition: background 0.2s; }
        .toggle-switch.active { background: var(--color-green-500); }
        .toggle-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: var(--shadow-sm); }
        .toggle-switch.active::after { transform: translateX(16px); }
      `}</style>
      <EdifiShell system="validation" activeNav="parameters" section="admin">
        <div className="page-header">
          <h1>Validation Rules</h1>
          <p>Configure stage-specific parameters and thresholds for the AI validation engine.</p>
        </div>

        {/* SD Rules */}
        <div className="rule-card" style={{ borderLeft: "4px solid #6366f1" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="badge badge-purple">SD — Schematic Design</span>
              <span style={{ fontSize: "0.8125rem", fontWeight: "700" }}>Spatial Intelligence Parameters</span>
            </div>
            <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /> Edit</button>
          </div>
          <div className="param-row"><span>Spatial Adjacency & Relationships</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 85%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Circulation Logic</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 90%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Programme Compliance</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 95%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Spatial Proportions</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Tolerance: ±5%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Core & Services Placement</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 80%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Vertical Consistency</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 90%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Code & Compliance Indicators</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Mandatory</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
        </div>

        {/* DD Rules */}
        <div className="rule-card" style={{ borderLeft: "4px solid #f59e0b" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="badge badge-amber">DD — Design Development</span>
              <span style={{ fontSize: "0.8125rem", fontWeight: "700" }}>Detail Accuracy Parameters</span>
            </div>
            <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /> Edit</button>
          </div>
          <div className="param-row"><span>SD Parameter Carry-Forward</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Mandatory</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Dimensional Accuracy</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Tolerance: ±2mm</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Detail Completeness</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 90%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Annotation Quality</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Min 3.0mm text</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Cross-Sheet Referencing</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Mandatory</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Schedule Validation</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Cross-check enabled</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Spatial Drift Advisory</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Advisory mode</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
        </div>

        {/* GFC Rules */}
        <div className="rule-card" style={{ borderLeft: "4px solid #22c55e" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="badge badge-green">GFC — Good for Construction</span>
              <span style={{ fontSize: "0.8125rem", fontWeight: "700" }}>Precision & Readiness Parameters</span>
            </div>
            <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /> Edit</button>
          </div>
          <div className="param-row"><span>Dimensional Precision</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Tolerance: ±1mm</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Drawing Completeness</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Threshold: 100%</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Cross-Set Consistency</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Mandatory</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Annotation Precision</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Zero tolerance</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Cross-Reference Integrity</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Mandatory</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Revision Control</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Tracked</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
          <div className="param-row"><span>Construction Readiness</span><div className="flex items-center gap-3"><span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Full check</span><div className="toggle-switch active" onClick={(e) => e.currentTarget.classList.toggle("active")}></div></div></div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="btn btn-secondary">Reset to Defaults</button>
          <button className="btn btn-primary"><EdIcon name="check" size={14} /> Save Changes</button>
        </div>
      </EdifiShell>
    </>
  );
}
